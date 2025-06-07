"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Filter, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Question } from "../page";

// Define the question interface

// Define the form data interface
interface FormData {
  position: string;
  description: string;
  duration: string;
  interviewTypes: string[];
}

interface InterviewType {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
  interviewQuestions: Question[];
  setInterviewQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setInterviewId: React.Dispatch<React.SetStateAction<string >>;
}

const QuestionList = ({
  setStep,
  formData,
  setInterviewQuestions,
  interviewQuestions,
  setInterviewId,
}: InterviewType) => {
  const createInterview = useMutation(api.interviews.createInterview);
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const generateQuestions = async () => {
      if (formData && !hasFetched.current) {
        hasFetched.current = true; // set to true so it won't run again
        try {
          setLoading(true);
          const response = await axios.post("/api/generate-question", formData);
          setInterviewQuestions(response?.data?.interviewQuestions || []);
        } catch (error) {
          console.error("Error generating questions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    generateQuestions();
  }, [formData, setInterviewQuestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create the data to submit
      const submissionData = {
        ...formData,
        questions: interviewQuestions,
      };

      // Make the API call to save the interview
      const response = await createInterview(submissionData);
      // Show success message
      toast.success("Interview saved successfully!");

      // Set the interview ID
      setInterviewId(response);
      // Move to the next step
      setStep(3);
    } catch (error) {
      console.error("Error saving interview:", error);
      toast.error("Failed to save interview. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const questionTypes = Array.from(
    new Set(interviewQuestions.map((q) => q.type)),
  );

  const filteredQuestions = filter
    ? interviewQuestions.filter((q) => q.type === filter)
    : interviewQuestions;

  const displayQuestions = expanded
    ? filteredQuestions
    : filteredQuestions.slice(0, 5);

  return (
    <div>
      {loading ? (
        <Card className="w-full mt-10 mx-auto">
          <CardHeader className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4" />
            <CardTitle className="text-2xl">Generating Questions</CardTitle>
            <CardDescription>
              Please wait while we generate relevant interview questions based
              on your inputs
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="w-full mt-10 mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Interview Questions</CardTitle>
              <CardDescription>
                Prepare for your next interview with these common questions
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-4 w-4" />
                  {filter || "All Types"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter(null)}>
                  All Types
                </DropdownMenuItem>
                {questionTypes.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setFilter(type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="grid gap-4">
            {displayQuestions.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm md:text-base">{item.question}</p>
                  <Badge variant="outline" className="shrink-0">
                    {item.type}
                  </Badge>
                </div>
              </div>
            ))}

            {filteredQuestions.length > 5 && (
              <Button
                variant="ghost"
                className="mt-2"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <span className="flex items-center gap-1">
                    Show Less <ChevronUp className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Show More ({filteredQuestions.length - 5} more){" "}
                    <ChevronDown className="h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back to Form
            </Button>
            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                disabled={submitting || interviewQuestions.length === 0}
                className="flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Interview
                  </>
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default QuestionList;
