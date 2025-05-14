import Logo from "@/components/Logo";
import React from "react";
import StartingInterview from "../_components/startingInterview";

const StartInterviewPage = () => {
  return (
    <div>
      <header
        className="
        flex items-center justify-between px-6 py-4  shadow-sm border-b border-gray-200 dark:border-gray-700 h-16
        "
      >
        <Logo />
      </header>
      <div className="flex items-center justify-center h-[calc(100vh-14rem)] w-full">
        <StartingInterview />
      </div>
    </div>
  );
};

export default StartInterviewPage;
