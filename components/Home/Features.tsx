import React from "react";
import FeatureCard from "./ui/FeatureCard";

const Features = () => {
  return (
    <section id="features" className="px-8 py-16 bg-GREY_15">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ABSOLUTE_BLACK" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          }
          title="AI Matching"
          description="Our AI algorithms match candidates to jobs with incredible precision, saving you time and resources."
          gradientFrom="from-bg-GREEN_60"
          gradientTo="to-bg-GREEN_80"
        />

        <FeatureCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ABSOLUTE_BLACK" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          }
          title="Automated Screening"
          description="Automatically screen candidates based on customizable criteria and reduce your hiring pipeline."
          gradientFrom="from-GREEN_70"
          gradientTo="to-GREEN_90"
        />

        <FeatureCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ABSOLUTE_BLACK" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          title="Smart Analytics"
          description="Gain insights into your recruitment process with detailed analytics and reporting tools."
          gradientFrom="from-GREEN_50"
          gradientTo="to-GREEN_70"
        />
      </div>
    </section>
  );
};

export default Features;