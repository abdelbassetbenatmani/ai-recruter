"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InterviewForm from "./_components/InterviewForm";

const CreateInterviewPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex items-center gap-x-2 py-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h2 className="text-2xl font-semibold ">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} />
      <InterviewForm />
    </div>
  );
};

export default CreateInterviewPage;
