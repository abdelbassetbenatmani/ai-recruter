import Logo from "@/components/Logo";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import React from "react";
import { AlertCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InterviewCard from "./_components/interviewCard";

const ExpiredInterviewCard = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-md border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-amber-700 dark:text-amber-400">
              Interview Expired
            </CardTitle>
          </div>
          <CardDescription className="text-amber-600/90 dark:text-amber-400/90">
            The interview session you&apos;re trying to access has expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-amber-600 dark:text-amber-400">
          <p>
            This interview is no longer available. Please check your schedule
            for upcoming interviews or contact your recruiter for more
            information.
          </p>
        </CardContent>
        <CardFooter>
          <a href="/dashboard" className="mt-2 w-full gap-2">
            <Button className="mt-2 w-full gap-2" variant="outline">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

const WrongIDCard = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-md border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-red-700 dark:text-red-400">
              Invalid ID
            </CardTitle>
          </div>
          <CardDescription className="text-red-600/90 dark:text-red-400/90">
            The ID you provided is incorrect or does not exist in our system.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-red-600 dark:text-red-400">
          <p>
            Please check your ID and try again. If you continue to experience
            issues, contact support for assistance.
          </p>
        </CardContent>
        <CardFooter>
          <a href="/dashboard" className="mt-2 w-full gap-2">
            <Button className="mt-2 w-full gap-2" variant="outline">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

const InterviewPage = async ({ params }: { params: { id: string } }) => {
  // Ensure params is awaited before accessing id
  const id = params?.id;
  console.log(id);

  // Now use the id in your fetchQuery
  const interview = await fetchQuery(api.interviews.getInterview, {
    interviewId: id,
  });

  if (interview.length === 0) {
    return <WrongIDCard />;
  }

  //   check if interview createdAt is more than 15 days ago
  const interviewDate = new Date(interview[0].createdAt);
  const now = new Date();
  const diff = now.getTime() - interviewDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  if (diffDays > 15) {
    return <ExpiredInterviewCard />;
  }

  return (
    <div>
      <header
        className="
        flex items-center justify-between px-6 py-4  shadow-sm border-b border-gray-200 dark:border-gray-700 h-16
        "
      >
        <Logo />
      </header>
      <div className="flex items-center justify-center h-[calc(100vh-14rem)]">
        <InterviewCard interview={interview[0]} />
      </div>
    </div>
  );
};

export default InterviewPage;
