import CreationSection from "@/components/Dashboard/CreationSection";
import PrevouisInterviews from "@/components/Dashboard/PrevouisInterviews";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="pt-10">
      <CreationSection />
      <PrevouisInterviews />
    </div>
  );
};

export default DashboardPage;
