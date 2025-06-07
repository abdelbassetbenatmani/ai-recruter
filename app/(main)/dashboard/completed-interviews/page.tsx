import InterviewsList from "@/components/Dashboard/InterviewsList";
import React from "react";

const CompletedInterviewPage = () => {
  return (
    <div>
      <InterviewsList type="completed" title="Completed Interviews" />
    </div>
  );
};

export default CompletedInterviewPage;
