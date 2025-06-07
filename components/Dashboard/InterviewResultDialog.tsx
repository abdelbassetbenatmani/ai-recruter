import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuit,
  MessageSquare,
  Lightbulb,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface InterviewResultDialogProps {
  interviewId: Id<"interviews"> | undefined;
}

const InterviewResultDialog = ({ interviewId }: InterviewResultDialogProps) => {
  const interviewResults = useQuery(api.feedback.getFeedback, { interviewId });

  const feedback = interviewResults?.[0]?.feedback;

  if (!interviewResults) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>Loading assessment results...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!feedback) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>
            No feedback available for this interview
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { rating, summary, recommendation, recommendationMsg } = feedback;

  // Function to get recommendation badge styling
  const getRecommendationStyle = () => {
    switch (recommendation.toLowerCase()) {
      case "hire":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "consider":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
      case "do not hire":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div className="w-full mx-auto bg-background rounded-lg shadow ">
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Interview Assessment Results</h2>
          <Badge
            variant="outline"
            className={`px-3 py-1 ${getRecommendationStyle()}`}
          >
            {recommendation}
          </Badge>
        </div>
        <p className="mt-2 text-muted-foreground">
          Candidate performance evaluation based on the interview
        </p>
      </div>

      <div className="space-y-8"></div>
      {/* Summary section */}
      <div>
        <h3 className="text-lg font-medium mb-2">Summary</h3>
        <p className="text-sm text-muted-foreground">{summary}</p>
      </div>

      {/* Skills rating section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Skills Assessment</h3>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <BrainCircuit className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium">Technical Skills</span>
              </div>
              <span className="text-sm font-medium">
                {rating.technicalSkills}/10
              </span>
            </div>
            <Progress value={rating.technicalSkills * 10} className="h-2 " />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-indigo-500" />
                <span className="text-sm font-medium">Communication</span>
              </div>
              <span className="text-sm font-medium">
                {rating.communication}/10
              </span>
            </div>
            <Progress value={rating.communication * 10} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                <span className="text-sm font-medium">Problem Solving</span>
              </div>
              <span className="text-sm font-medium">
                {rating.problemSolving}/10
              </span>
            </div>
            <Progress value={rating.problemSolving * 10} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-violet-500" />
                <span className="text-sm font-medium">Experience</span>
              </div>
              <span className="text-sm font-medium">
                {rating.experience}/10
              </span>
            </div>
            <Progress value={rating.experience * 10} className="h-2" />
          </div>
        </div>
      </div>

      {/* Recommendation section */}
      <div className="border-t pt-4 pb-2">
        <h3 className="text-lg font-medium mb-2">Recommendation</h3>
        <p className="text-sm text-muted-foreground">{recommendationMsg}</p>
      </div>

      {/* Overall score - calculated as average */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Overall Score</h3>
          <span className="text-lg font-medium">
            {Math.round(
              ((rating.technicalSkills +
                rating.communication +
                rating.problemSolving +
                rating.experience) /
                4) *
                10,
            ) / 10}
            /10
          </span>
        </div>
        <Progress
          value={
            ((rating.technicalSkills +
              rating.communication +
              rating.problemSolving +
              rating.experience) /
              4) *
            10
          }
          className="h-3"
        />
      </div>
    </div>
  );
};

export default InterviewResultDialog;
