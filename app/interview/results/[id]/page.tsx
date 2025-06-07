"use client";
import Link from "next/link";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import InterviewResultDialog from "@/components/Dashboard/InterviewResultDialog";
const InterviewResultPage = () => {
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
            Thank you for completing your interview. You can see the summary of
            your interview below. If you have any feedback or questions, feel
            free to reach out to our support team.
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
            {/* interview types */}
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50 w-full">
              <div>
                <p className="text-sm font-medium">Interview Types:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {interview?.interviewTypes?.map(
                    (type: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {type}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {interview?.description && (
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50 w-full">
                <div className="w-full">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="description">
                      <AccordionTrigger>Description</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          {interview.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            )}

            {/* interview questions */}
            {interview?.questions && interview.questions.length > 0 && (
              <div className="p-4 rounded-lg border bg-muted/50 w-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="questions">
                    <AccordionTrigger>Interview Questions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {interview.questions.map((q, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 rounded-lg border bg-background shadow-sm"
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  {q.question}
                                </span>
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground border border-muted-foreground/10">
                                  {q.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* interview dailog result */}
            <Dialog >
              <DialogTrigger  className="w-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 py-2 rounded-md cursor-pointer">
                  View Interview Result
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Interview Result</DialogTitle>
                  <DialogDescription>
                    Here are the results of your interview.
                  </DialogDescription>
                </DialogHeader>
               <InterviewResultDialog interviewId={interview?._id} />
              </DialogContent>
            </Dialog>
          </CardContent>
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
};

export default InterviewResultPage;
