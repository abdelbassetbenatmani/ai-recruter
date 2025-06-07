"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Plus, Video } from "lucide-react";
import { Card } from "../ui/card";
import InterviewCardInfo from "./InterviewCardInfo";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SkeletonCards from "../Skeleton";

export interface PrevouisInterviewsProps {
  _id: string;
  position: string;
  description: string;
  duration: string;
  createdAt: number;
}

interface InterviewsListProps {
  type?: "completed" | "scheduled" | "all" | "dashboard";
  title: string;
}

const InterviewsList: React.FC<InterviewsListProps> = ({ type, title }) => {
  // Call all hooks unconditionally
  const completedInterviews = useQuery(api.interviews.getCompletedInterviews);
  const scheduledInterviews = useQuery(api.interviews.getScheduledInterviews);
  const allInterviews = useQuery(api.interviews.getInterviews, {});
  const dashboardInterviews = useQuery(api.interviews.getInterviews, {
    limit: 3,
  });

  let interviewList;

  // Select the correct data based on type
  switch (type) {
    case "completed":
      interviewList = completedInterviews;
      break;
    case "scheduled":
      interviewList = scheduledInterviews;
      break;
    case "all":
      interviewList = allInterviews;
      break;
    default:
      interviewList = dashboardInterviews;
  }

  const [interviews, setInterviews] = React.useState<PrevouisInterviewsProps[]>(
    [],
  );

  useEffect(() => {
    if (interviewList) {
      setInterviews(interviewList);
    }
  }, [interviewList]);

  // Loading state - show skeletons while data is loading
  if (interviewList === undefined) {
    return (
      <div className="pt-8">
        <h2 className="text-xl font-semibold mb-10">
          {title}
        </h2>
        <SkeletonCards />
      </div>
    );
  }

  return (
    <div className="pt-8">
      <h2 className="text-xl font-semibold mb-10">
        {title}
      </h2>

      {interviews.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-y-2 mt-8 p-8">
          <Video className="h-12 w-12 text-gray-400" />
          <p className="text-gray-400">No interviews created yet</p>
          <Button className="mt-2">
            <Link
              className="flex gap-x-2 items-center"
              href="/dashboard/create-interview"
            >
              <Plus /> Create New Interview
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8">
          {interviews.map((interview, index) => (
            <InterviewCardInfo key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewsList;
