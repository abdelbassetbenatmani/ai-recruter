import InterviewsList from "@/components/Dashboard/InterviewsList";
import React from "react";

const ScheduledInterviewPage = () => {
  return (
    <div>
      <InterviewsList type="scheduled" title="Scheduled Interviews" />
    </div>
  );
};

export default ScheduledInterviewPage;
