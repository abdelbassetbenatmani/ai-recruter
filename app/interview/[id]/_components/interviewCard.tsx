"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarClock, Video, Volume2, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Form validation schema
const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function InterviewCard({interview}: {interview: any}) {
  const router = useRouter()
  const updateInterview = useMutation(api.interviews.updateInterview);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsUpdating(true);
    try {
      // Update the interview with the full name
      await updateInterview({
        id: interview._id,
        update: {
          fullName: data.fullName,
        },
      });
      
      toast.success("Name submitted successfully");
      setIsSubmitted(true);
      
      // Remove the automatic redirect to allow user to click the Join Interview button
      // router.push(`/interview/${interview._id}/start`);
    } catch (error) {
      console.error("Error updating interview:", error);
      toast.error("Failed to submit name. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleJoinInterview = () => {
    router.push(`/interview/${interview._id}/start`);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="flex flex-col items-center space-y-4 pb-2">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <CalendarClock className="w-12 h-12" />
        </div>

        <h2
          className="text-2xl font-bold text-center"
        >
          {interview?.position} Interview
        </h2>
        <h2 className="text-base font-bold text-center">
          Interview Duration: {interview?.duration || "30 Minutes"}
        </h2>
      </CardHeader>

      <CardContent className="pt-4">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName")}
                aria-invalid={errors.fullName ? "true" : "false"}
                disabled={isUpdating}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200 " >
            <AlertCircle className="h-4 w-4 text-blue-800" color="#193cb8"/>
              <AlertDescription className="text-blue-800">
                Please ensure your camera and microphone are working properly
                before joining the interview. Find a quiet place with good
                lighting.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button 
                className="flex items-center justify-center gap-2"
                onClick={handleJoinInterview}
              >
                <Video className="w-4 h-4" />
                <span>Join Interview</span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Test Audio & Video</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center text-sm text-muted-foreground pt-2">
        {!isSubmitted
          ? "Please enter your full name to proceed"
          : "Your interview is ready to begin"}
      </CardFooter>
    </Card>
  );
}
