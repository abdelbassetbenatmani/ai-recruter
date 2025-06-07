"use client";
import React, { useEffect, useState, useRef } from "react";
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

// Helper functions moved outside component for cleanliness
const parseDuration = (durationStr: string | undefined): number => {
  if (!durationStr) return 30 * 60; // Default 30 minutes

  const numMatch = durationStr.match(/\d+/);
  const number = numMatch ? parseInt(numMatch[0], 10) : 30;

  if (durationStr.toLowerCase().includes("hour")) {
    return number * 60 * 60; // Convert hours to seconds
  } else {
    return number * 60; // Convert minutes to seconds
  }
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const StartInterviewPage = () => {
  // Router and params
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // Refs
  const vapiRef = useRef<Vapi | null>(null);

  // Queries and mutations
  const updateInterview = useMutation(api.interviews.updateInterview);
  const createFeedback = useMutation(api.feedback.createFeedback);
  const interviews = useQuery(api.interviews.getInterview, {
    interviewId: id || "",
  });
  const interview = interviews?.[0];

  // State
  const [time, setTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAISpeaking, setIsAISpeaking] = useState<boolean>(false);
  const [vapiStarted, setVapiStarted] = useState<boolean>(false);
  const [maxDuration, setMaxDuration] = useState<number | null>(null);
  const [conversation, setConversation] = useState<
    Array<{
      role: string;
      content: string;
      timestamp: number;
      type?: string;
    }>
  >([]);

  // Initialize Vapi instance once
  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || "");

    return () => {
      // Clean up when component unmounts
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (error) {
          console.error("Error stopping Vapi on unmount:", error);
        }
      }
    };
  }, []);

  // Set max duration when interview data is loaded
  useEffect(() => {
    if (interview?.duration) {
      const durationInSeconds = parseDuration(interview.duration);
      setMaxDuration(durationInSeconds);
    }
  }, [interview]);

  // Initialize Vapi with assistant options when interview data is loaded
  useEffect(() => {
    if (interview && vapiRef.current && !vapiStarted) {
      const questionList = interview.questions.map(
        (question) => question.question,
      );
      const questionListString = questionList?.join(", ");

      const assistantOptions: AssistantOverrides = {
        name: "AI Recruiter",
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

      // Set up event listeners before starting Vapi
      const handleMessage = (message: any) => {
        console.log("Message received:", message);

        // For transcript messages, format and add to conversation
        if (message.type === "transcript" || message.type === "message") {
          console.log(`${message.role}: ${message.transcript}`);
          const newMessage = {
            role: message.role || "unknown",
            content: message.transcript || message.text || "",
            timestamp: Date.now(),
            type: message.type,
          };

          setConversation((prev) => [...prev, newMessage]);
        }
      };

      const handleSpeechStart = () => {
        console.log("Assistant speech has started");
        setIsAISpeaking(true);
      };

      const handleSpeechEnd = () => {
        console.log("Assistant speech has ended");
        setIsAISpeaking(false);
      };

      // Add event listeners
      vapiRef.current.on("message", (message) => {
        if (message.type === "transcript") {
          // Handle transcript messages

          console.log(`${message.role}: ${message.transcript}`);
          const newMessage = {
            role: message.role || "unknown",
            content: message.transcript || message.text || "",
            timestamp: Date.now(),
            type: message.type,
          };
          setConversation((prev) => [...prev, newMessage]);
        }
      });
      vapiRef.current.on("speech-start", handleSpeechStart);
      vapiRef.current.on("speech-end", handleSpeechEnd);

      // Start Vapi
      try {
        vapiRef.current.start(
          "c91b4bd5-81d2-49a8-b9bf-78657ab43734",
          assistantOptions,
        );
        setVapiStarted(true);

        // Check initial mute state
        if (vapiRef.current.isMuted) {
          setIsMuted(vapiRef.current.isMuted());
        }
      } catch (error) {
        console.error("Error starting Vapi:", error);
        toast.error("Failed to start interview assistant");
      }

      // Clean up function
      return () => {
        if (vapiRef.current) {
          try {
            vapiRef.current.off("message", handleMessage);
            vapiRef.current.off("speech-start", handleSpeechStart);
            vapiRef.current.off("speech-end", handleSpeechEnd);
          } catch (error) {
            console.error("Error removing Vapi event listeners:", error);
          }
        }
      };
    }
  }, [interview, vapiStarted]);

  // Timer effect with duration check
  useEffect(() => {
    if (maxDuration === null) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;

        // Check if we've reached the max duration
        if (newTime >= maxDuration) {
          clearInterval(timer);
          endInterview(newTime);
          return maxDuration; // Cap at max duration
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [maxDuration]);

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

  // Handle mute toggle
  const toggleMute = () => {
    try {
      if (vapiStarted && vapiRef.current) {
        const currentMuteState = vapiRef.current.isMuted();
        vapiRef.current.setMuted(!currentMuteState);
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

  // End interview function - use either from timeout or manual end
  const endInterview = async (currentTime?: number) => {
    const timeToRecord = currentTime || time;

    // Show toast notification if ending due to time limit
    if (currentTime && maxDuration && currentTime >= maxDuration) {
      toast.info("Interview time limit reached");
    }

    try {
      // Only update if we have an interview ID
      if (interview?._id) {
        // Update interview with duration and conversation
        await updateInterview({
          id: interview._id as Id<"interviews">,
          update: {
            interviewDuration: formatTime(timeToRecord),
          },
        });

        const conversationString = conversation
          .map((msg) => `${msg.role}: ${msg.content}`)
          .join("\n");

        // create feedback entry
        const feedback = await fetch("/api/generate-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversation: conversationString,
            interviewId: interview._id,
            // userId: interview.userId,
          }),
        });
        if (!feedback.ok) {
          throw new Error("Failed to generate feedback");
        }
        // Replace the section where you process the feedback data (around line 326-348)

        const feedbackData = await feedback.json();
        // Add default values for recommendation fields in case they're missing
        const feedbackToSave = {
          rating: {
            technicalSkills:
              feedbackData.feedback?.rating?.technicalSkills || 5,
            communication: feedbackData.feedback?.rating?.communication || 5,
            problemSolving: feedbackData.feedback?.rating?.problemSolving || 5,
            experience: feedbackData.feedback?.rating?.experience || 5,
          },
          summary:
            feedbackData.feedback?.summary ||
            "Interview feedback summary not available.",
          // Ensure these required fields always have a value
          recommendation:
            feedbackData.feedback?.recommendation || "No clear recommendation",
          recommendationMsg:
            feedbackData.feedback?.recommendationMsg ||
            "No recommendation message provided",
        };

        // Save feedback with validated structure
        await createFeedback({
          interviewId: interview._id as Id<"interviews">,
          feedback: feedbackToSave,
        });
        console.log("Feedback generated:", feedbackData);
        console.log("Interview data saved:", {
          duration: formatTime(timeToRecord),
          conversationLength: conversation.length,
        });
      }

      // Stop Vapi
      if (vapiRef.current) {
        vapiRef.current.stop();
        console.log("Vapi stopped successfully");
      }

      // Redirect to completion page
      router.push(`/interview/${id}/complete`);
    } catch (error) {
      console.error("Error ending interview:", error);
      toast.error("Error saving interview data");

      // Still try to stop Vapi and redirect even if saving fails
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (stopError) {
          console.error("Error stopping Vapi:", stopError);
        }
      }

      router.push(`/interview/${id}/complete`);
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

          {/* Recent transcript display */}
          {conversation.length > 0 && (
            <div className="mt-4 p-4 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-800">
              <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Recent conversation:
              </h3>
              {conversation.slice(-3).map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 ${
                    msg.role === "assistant"
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="font-medium">
                    {msg.role === "assistant" ? "Recruiter: " : "You: "}
                  </span>
                  <span>{msg.content}</span>
                </div>
              ))}
            </div>
          )}

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
              onClick={() => endInterview()}
              className="rounded-full p-6"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>

          {/* Connection status */}
          <div className="mt-4 text-center">
            <span
              className={`text-xs ${vapiStarted ? "text-green-600" : "text-amber-600"}`}
            >
              {vapiStarted
                ? "Interview in progress"
                : "Connecting to interview assistant..."}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartInterviewPage;
