"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InterviewForm from "./_components/InterviewForm";
import QuestionList from "./_components/QuestionList";
import InterviewLink from "./_components/InterviewLink";

export interface Question {
  question: string;
  type: string;
}

const CreateInterviewPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    position: "",
    description: "",
    duration: "",
    interviewTypes: [],
  });
  const [interviewQuestions, setInterviewQuestions] = useState<Question[]>([]);
  const [interviewId, setInterviewId] = useState("");
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex items-center gap-x-2 py-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h2 className="text-2xl font-semibold ">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} />
      {step === 1 ? (
        <InterviewForm setStep={setStep} setFormData={setFormData} />
      ) : step === 2 ? (
        <QuestionList
          setStep={setStep}
          formData={formData}
          setInterviewQuestions={setInterviewQuestions}
          interviewQuestions={interviewQuestions}
          setInterviewId={setInterviewId}
        />
      ) : (
        <InterviewLink
          interviewId={interviewId}
          title={formData.position}
          questions={interviewQuestions.length}
          duration={formData.duration}
        />
      )}
    </div>
  );
};

export default CreateInterviewPage;
