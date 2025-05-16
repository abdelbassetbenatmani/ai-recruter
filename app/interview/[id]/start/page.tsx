"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Vapi from "@vapi-ai/web";
import { AssistantOverrides } from "@vapi-ai/web/dist/api";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import InterviewHeader from "../_components/InterviewHeader";
import InterviewTimer from "../_components/InterviewTimer";
import VideoCard from "../_components/VideoCard";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY ?? "");
// Parse duration string to seconds
const parseDuration = (durationStr: string | undefined): number => {
  if (!durationStr) return 30 * 60; // Default 30 minutes

  // Extract numbers and check if it contains "min" or "hour"
  const numMatch = durationStr.match(/\d+/);
  const number = numMatch ? parseInt(numMatch[0], 10) : 30;

  if (durationStr.toLowerCase().includes("hour")) {
    return number * 60 * 60; // Convert hours to seconds
  } else {
    return number * 60; // Convert minutes to seconds
  }
};

// Format time as mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const StartInterviewPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const updateInterview = useMutation(api.interviews.updateInterview);
  const interviews = useQuery(api.interviews.getInterview, {
    interviewId: id?.toString() ?? "",
  });

  const interview = interviews?.[0];
  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [vapiStarted, setVapiStarted] = useState(false);
  const [maxDuration, setMaxDuration] = useState<number | null>(null);
  const [conversation, setConversation] = useState<any[]>([]);

  // Set max duration when interview data is loaded
  useEffect(() => {
    if (interview?.duration) {
      const durationInSeconds = parseDuration(interview.duration);
      setMaxDuration(durationInSeconds);
    }
  }, [interview]);

  // Timer effect with duration check
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;

        // Check if we've reached the max duration
        if (maxDuration && newTime >= maxDuration) {
          // Clear the interval
          clearInterval(timer);

          // Show a toast notification
          toast.info("Interview time limit reached");

          // Save interview duration before stopping
          if (interview?._id) {
            updateInterview({
              id: interview._id as Id<"interviews">,
              update: {
                interviewDuration: formatTime(newTime),
              },
            })
              .then(() => {
                // Stop the Vapi call
                vapi.stop();

                // Redirect to the completion page
                router.push(`/interview/${id}/complete`);
              })
              .catch((error) => {
                console.error("Error updating interview duration:", error);
                // Still stop and redirect even if saving fails
                vapi.stop();
                router.push(`/interview/${id}/complete`);
              });
          } else {
            // If no interview ID, just stop and redirect
            vapi.stop();
            router.push(`/interview/${id}/complete`);
          }

          return newTime;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [maxDuration, id, router, interview, updateInterview]);

  // Calculate remaining time
  const getRemainingTime = (): string => {
    if (!maxDuration) return formatTime(time);
    const remaining = Math.max(0, maxDuration - time);
    return formatTime(remaining);
  };

  // Get timer color based on remaining time
  const getTimerColor = (): string => {
    if (!maxDuration) return "bg-red-50 text-red-700 border-red-200";

    const remaining = maxDuration - time;
    const percentRemaining = (remaining / maxDuration) * 100;

    if (percentRemaining <= 10) {
      return "bg-red-100 text-red-700 border-red-300 animate-pulse";
    } else if (percentRemaining <= 30) {
      return "bg-orange-50 text-orange-700 border-orange-200";
    } else {
      return "bg-green-50 text-green-700 border-green-200";
    }
  };

  useEffect(() => {
    // Only proceed if interview data is loaded and Vapi hasn't been started yet
    if (interview && !vapiStarted) {
      const questionList = interview.questions.map(
        (question) => question.question,
      );
      const questionListString = questionList.join(", ");

      const assistantOptions: AssistantOverrides = {
        name: "AI Recruiter",
        clientMessages: [],
        serverMessages: [],
        firstMessage: `Hi ${interview.fullName || "there"}, how are you? Ready for your interview on ${interview.position || "this position"}?`,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
                 You are an AI voice assistant conducting interviews.
                 Your job is to ask candidates provided interview questions, assess their responses.
                 Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
                 "Hey there! Welcome to your ${interview.position || "technical"} interview. Let's get started with a few questions!"

                 Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
                 Questions: ${questionListString}

                 If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
                 "Need a hint? Think about how React tracks component updates!"

                 Provide brief, encouraging feedback after each answer. Example:
                 "Nice! That's a solid answer."
                 "Hmm, not quite! Want to try again?"

                 Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!" After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
                 "That was great! You handled some tough questions well. Keep sharpening your skills!"

                 End on a positive note:
                 "Thanks for chatting! Hope to see you crushing projects soon!"

                 Key Guidelines:
                 - Be friendly, engaging, and witty
                 - Keep responses short and natural, like a real conversation
                 - Adapt based on the candidate's confidence level
                 - Ensure the interview remains focused on ${interview.position || "the role"}
               `.trim(),
            },
          ],
        },
      };

      vapi.start("c91b4bd5-81d2-49a8-b9bf-78657ab43734", assistantOptions);

      // Set up event listeners for speech
      vapi.on("speech-start", () => {
        console.log("Assistant speech has started.");
        setIsAISpeaking(true);
      });

      vapi.on("speech-end", () => {
        console.log("Assistant speech has ended.");
        setIsAISpeaking(false);
      });

      // Add message event listener to capture conversation
      vapi.on("message", (message) => {
        console.log("Message received:", message);
        setConversation(prev => [...prev, message]);
      });

      // Check initial mute state
      setIsMuted(vapi.isMuted());

      setVapiStarted(true);

      return () => {
        // Clean up event listeners and stop Vapi when component unmounts
        try {
          vapi.off("speech-start", () => {
            console.log("Assistant speech has started....");
          });

          vapi.off("speech-end", () => {
            console.log("Assistant speech has ended....");
          });

          vapi.off("message", () => {
            console.log("Message event listener removed...");
          });
        } catch (error) {
          console.error("Error stopping Vapi:", error);
        }
      };
    }
  }, [interview, vapiStarted]);

  // Handle mute toggle
  const toggleMute = () => {
    try {
      if (vapiStarted && vapi) {
        const currentMuteState = vapi.isMuted();
        vapi.setMuted(!currentMuteState);
        setIsMuted(!currentMuteState);
      } else {
        // If vapi hasn't started yet, just toggle the UI state
        setIsMuted((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling mute state:", error);
      // Fallback to just toggling the UI state if vapi methods fail
      setIsMuted((prev) => !prev);
    }
  };

  // Safely stop Vapi and redirect
  const endInterview = async () => {
    try {
      await updateInterview({
        id: interview?._id as Id<"interviews">,
        update: {
          interviewDuration: formatTime(time),
        },
      });
      console.log(conversation);
      
      vapi.stop();
      console.log("Vapi stopped manually");
    } catch (error) {
      console.error("Error stopping Vapi:", error);
    } finally {
      // Always redirect, even if there was an error stopping Vapi
      // router.push(`/interview/${id}/complete`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <InterviewHeader />
      <div className="flex-1 flex flex-col">
        {/* Header with timer */}
        <InterviewTimer
          maxDuration={maxDuration}
          time={time}
          formatTime={formatTime}
          getRemainingTime={getRemainingTime}
          getTimerColor={getTimerColor}
        />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 flex flex-col">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Interviewer video */}
            <VideoCard
              isHighlighted={isAISpeaking}
              highlightColor="green"
              label="Interviewer"
              isSpeaking={isAISpeaking}
              speakerType="ai"
            />

            {/* User video */}
            <VideoCard
              isHighlighted={!isAISpeaking && !isMuted}
              highlightColor="blue"
              label="You"
              isSpeaking={!isAISpeaking && !isMuted}
              isMuted={isMuted}
              speakerType="user"
            />
          </div>

          {/* Controls */}
          <div className="mt-6 flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className={`rounded-full p-6 ${isMuted ? "bg-red-50 text-red-700 border-red-200" : ""}`}
              onClick={toggleMute}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={endInterview}
              className="rounded-full p-6"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartInterviewPage;
