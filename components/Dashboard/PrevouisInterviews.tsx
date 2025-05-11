import React from "react";
import { Button } from "../ui/button";
import { Plus, Video } from "lucide-react";
import { Card } from "../ui/card";
import InterviewCardInfo from "./InterviewCardInfo";
import Link from "next/link";

export interface PrevouisInterviewsProps {
  title: string;
  description: string;
  icon: string;
  duration: string;
  date: string;
}

const PrevouisInterviews = () => {
  const interviews: PrevouisInterviewsProps[] = [
    // {
    //   title: "Interview with John Doe",
    //   description: "Interview with John Doe about his experience in React",
    //   icon: "lucide-react",
    //   duration: "15 mins",
    //   date: "12/12/2021",
    // },
    // {
    //   title: "Interview with John Doe",
    //   description: "Interview with John Doe about his experience in React",
    //   icon: "lucide-react",
    //   duration: "15 mins",
    //   date: "12/12/2021",
    // },
    // {
    //   title: "Interview with John Doe",
    //   description: "Interview with John Doe about his experience in React",
    //   icon: "lucide-react",
    //   duration: "15 mins",
    //   date: "12/12/2021",
    // },
  ];
  return (
    <div className="pt-8">
      <h2 className="text-xl font-semibold mb-10">
        Previously Created Interviews
      </h2>

      {interviews.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-y-2 mt-8">
          <Video className="h-12 w-12 text-gray-400" />
          <p className="text-gray-400">No interviews created yet</p>
          <Button className="">
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
