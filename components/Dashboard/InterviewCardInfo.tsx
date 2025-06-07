"use client";
import React from "react";
import { PrevouisInterviewsProps } from "./InterviewsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Send,
  Clock,
  TvMinimalPlay,
  Info,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface InterviewCardInfoProps {
  interview: PrevouisInterviewsProps;
}

const InterviewCardInfo: React.FC<InterviewCardInfoProps> = ({ interview }) => {
  const isCompleted = interview?.fullName !== "";

  const handleCopyLink = () => {
    // Copy interview link to clipboard
    navigator.clipboard.writeText(
      window.location.origin + "/interview/" + interview._id,
    );
    toast("Link copied to clipboard");
  };

  const handleSend = () => {
    // Handle sending the interview
    toast("Interview link sent successfully");
  };

  return (
    <Card
      className={`w-full overflow-hidden hover:shadow-md transition-all gap-3 ${
        isCompleted
          ? "border-green-200 bg-green-50/90 dark:bg-green-950/20 dark:border-green-800"
          : ""
      }`}
    >
      <CardHeader className="">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-md ${
                isCompleted
                  ? "bg-green-100 dark:bg-green-900/50"
                  : "bg-primary/10"
              } flex items-center justify-center`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <TvMinimalPlay className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">
                {new Date(interview.createdAt).toISOString().split("T")[0]}
              </span>
              {isCompleted && (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 text-xs"
                >
                  Completed
                </Badge>
              )}
              {!isCompleted && (
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 text-xs"
                >
                  Pending
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {interview.duration}
            </span>
          </div>
        </div>
        <CardTitle className="text-base font-medium">
          {interview.position}
        </CardTitle>
        {isCompleted && (
          <div className="text-sm text-green-700 dark:text-green-400 mt-1 flex items-center">
            <span className="font-medium mr-1">Candidate:</span>{" "}
            {interview.fullName}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">
          {interview.description.length > 100
            ? `${interview.description.slice(0, 100)}...`
            : interview.description}
        </CardDescription>
        <div className="flex justify-end gap-2 mt-2">
          {isCompleted ? (
            <Link href={`/interview/results/${interview._id}`}>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white"
              >
                <Info className="h-4 w-4 mr-1" />
                View Results
              </Button>
            </Link>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-1" />
                Copy Link
              </Button>
              <Button size="sm" onClick={handleSend}>
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewCardInfo;
