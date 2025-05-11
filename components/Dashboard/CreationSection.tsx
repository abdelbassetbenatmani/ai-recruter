"use client";
import React from "react";
import CreateCard from "./CreateCard";
import { Phone, Video } from "lucide-react";

const CreationSection = () => {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <CreateCard
        title="Create a new interview"
        description="Create Al interviews and schedule them with candidates"
        icon={Video}
        href="/dashboard/create-interview"
      />
      <CreateCard
        title="Create Phone Screening Call"
        description="Schedule phone screening calls with potential candidates"
        icon={Phone}
        href="/dashboard/create-phone-screening-call"
      />
    </div>
  );
};

export default CreationSection;
