"use client"
import React from "react";
import { PrevouisInterviewsProps } from "./PrevouisInterviews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Send, Clock } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface InterviewCardInfoProps {
  interview: PrevouisInterviewsProps;
}

const InterviewCardInfo: React.FC<InterviewCardInfoProps> = ({ interview }) => {
  const handleCopyLink = () => {
    // Copy interview link to clipboard
    navigator.clipboard.writeText(
      window.location.origin +
        "/interview/" +
        interview.title.toLowerCase().replace(/\s+/g, "-"),
    );
    toast("Link copied to clipboard");
  };

  const handleSend = () => {
    // Handle sending the interview
    toast("Interview link sent successfully");
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Image
                src={"/"}
                alt={interview.title}
                width={16}
                height={16}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {interview.date}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {interview.duration} min
            </span>
          </div>
        </div>
        <CardTitle className="text-base font-medium">
          {interview.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">
          {interview.description}
        </CardDescription>
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={handleCopyLink}>
            <Copy className="h-4 w-4 mr-1" />
            Copy Link
          </Button>
          <Button size="sm" onClick={handleSend}>
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewCardInfo;
