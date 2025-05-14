"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Plus, Video } from "lucide-react";
import { Card } from "../ui/card";
import InterviewCardInfo from "./InterviewCardInfo";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "../ui/skeleton";

export interface PrevouisInterviewsProps {
  _id: string;
  position: string;
  description: string;
  duration: string;
  createdAt: number;
}

const PrevouisInterviews = () => {
  const interviewsList = useQuery(api.interviews.getInterviews);
  const [interviews, setInterviews] = React.useState<PrevouisInterviewsProps[]>([]);
  
  useEffect(() => {
    if (interviewsList) {
      setInterviews(interviewsList);
    }
  }, [interviewsList]);

  // Loading state - show skeletons while data is loading
  if (interviewsList === undefined) {
    return (
      <div className="pt-8">
        <h2 className="text-xl font-semibold mb-10">
          Previously Created Interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex justify-end gap-x-3 items-center pt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <h2 className="text-xl font-semibold mb-10">
        Previously Created Interviews
      </h2>

      {interviews.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-y-2 mt-8 p-8">
          <Video className="h-12 w-12 text-gray-400" />
          <p className="text-gray-400">No interviews created yet</p>
          <Button className="mt-2">
            <Link className="flex gap-x-2 items-center" href="/dashboard/create-interview">
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

export default PrevouisInterviews;
