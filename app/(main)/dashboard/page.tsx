import CreationSection from "@/components/Dashboard/CreationSection";
import InterviewsList from "@/components/Dashboard/InterviewsList";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="pt-10">
      <CreationSection />
      <InterviewsList type="dashboard" title="Latest Interviews" />
    </div>
  );
};

export default DashboardPage;
