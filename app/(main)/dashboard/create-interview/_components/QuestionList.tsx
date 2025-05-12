"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

// Define the question interface
interface Question {
  question: string;
  type: string;
}

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
}

const QuestionList = ({ setStep, formData }: InterviewType) => {
  const hasFetched = useRef(false);
  const [interviewQuestions, setInterviewQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const generateQuestions = async () => {
      if (formData && !hasFetched.current) {
        hasFetched.current = true; // set to true so it won't run again
        try {
          setLoading(true);
          const response = await axios.post("/api/generate-question", formData);

          console.log(response.data.data);
          
          // 👇 Fix this part too (explained below)
          const replacingJson = response.data.data.replace(
            /```json/g,
            ""
          ).replace(/```/g, "");
          const content = JSON.parse(replacingJson);
          
          setInterviewQuestions(content?.interviewQuestions || []);
        } catch (error) {
          console.error("Error generating questions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    generateQuestions();
  }, []);

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
              Please wait while we generate relevant interview questions based on your inputs
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
        </Card>
      )}
    </div>
  );
};

export default QuestionList;
