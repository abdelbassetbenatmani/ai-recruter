"use client";
import Link from "next/link";
import { CheckCircle, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export default function InterviewCompletePage() {
  const params = useParams();
  const id = params?.id;
  const interviews = useQuery(api.interviews.getInterview, {
    interviewId: id?.toString() ?? "",
  });
  const interview = interviews?.[0];
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Success Message */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Interview Completed!
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Thank you for completing your interview. Your responses have been
            successfully recorded.
          </p>
        </div>

        {/* Interview Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Summary</CardTitle>
            <CardDescription>
              Here&apos;s a summary of your completed interview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date Completed</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {interview?.interviewDuration} minutes from{" "}
                    {interview?.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-card">
              <h3 className="font-medium mb-2">Interview Status</h3>
              <div className="text-sm text-muted-foreground">
                <p>
                  Your interview has been successfully completed and submitted.
                  We will process your responses and get back to you with the
                  next steps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card>
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted/50 text-sm font-medium">
                  1
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-medium">Review Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your interview responses within the
                    next 5-7 business days.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted/50 text-sm font-medium">
                  2
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-medium">Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll receive an email with feedback and next steps
                    information.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted/50 text-sm font-medium">
                  3
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-medium">Follow-up Interview</h3>
                  <p className="text-sm text-muted-foreground">
                    If selected, you&apos;ll be invited for a follow-up
                    interview with the hiring team.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-muted-foreground">
              Reference ID: #{`${params.id}`}
            </p>
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto">
                Return to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Additional Resources */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Need Help?</h2>
          <p className="text-muted-foreground">
            If you have any questions about your interview or the hiring
            process, please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">Contact Support</Button>
            <Button variant="outline">FAQ</Button>
            <Link href="/dashboard">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
