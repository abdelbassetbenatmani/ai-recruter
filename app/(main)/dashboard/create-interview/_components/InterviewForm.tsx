"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Plus, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define the form schema with validation rules
const formSchema = z.object({
  position: z.string().min(2, {
    message: "Job position must be at least 2 characters.",
  }),
  description: z.string().min(20, {
    message: "Job description must be at least 20 characters.",
  }),
  duration: z.string({
    required_error: "Please select an interview duration.",
  }),
});

interface InterviewType {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function InterviewForm({ setStep, setFormData }: InterviewType) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomTypeInput, setShowCustomTypeInput] = useState(false);
  const [customTypeValue, setCustomTypeValue] = useState("");
  const customInputRef = useRef<HTMLInputElement>(null);
  const [interviewTypes, setInterviewTypes] = useState({
    technical: false,
    behavioral: false,
    caseStudy: false,
    rolePlay: false,
    problemSolving: false,
    systemDesign: false,
    codingChallenge: false,
    culturalFit: false,
    leadershipAssessment: false,
    projectManagement: false,
    dataAnalysis: false,
    communicationSkills: false,
    stressInterview: false,
    teamCollaboration: false,
  });
  const [customTypes, setCustomTypes] = useState<Record<string, boolean>>({});

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      description: "",
      duration: "",
    },
  });

  const toggleInterviewType = (type: keyof typeof interviewTypes) => {
    setInterviewTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleCustomType = (type: string) => {
    setCustomTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleAddCustomType = () => {
    if (customTypeValue.trim() === "") return;

    setCustomTypes((prev) => ({
      ...prev,
      [customTypeValue]: true,
    }));
    setCustomTypeValue("");
    setShowCustomTypeInput(false);
  };

  const handleCustomTypeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomType();
    } else if (e.key === "Escape") {
      setShowCustomTypeInput(false);
      setCustomTypeValue("");
    }
  };

  // Check if at least one interview type is selected
  const hasSelectedInterviewType = () => {
    return (
      Object.values(interviewTypes).some((value) => value === true) ||
      Object.values(customTypes).some((value) => value === true)
    );
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Validate that at least one interview type is selected
    if (!hasSelectedInterviewType()) {
      toast.error("Please select at least one interview type");
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine form values with selected interview types
      const formData = {
        ...values,
        interviewTypes: [
          ...Object.entries(interviewTypes)
            .filter(([, selected]) => selected)
            .map(([type]) => type),
          ...Object.entries(customTypes)
            .filter(([, selected]) => selected)
            .map(([type]) => type),
        ],
      };

      console.log("Form submitted", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData(formData);
      setStep(2);
      // Here you would typically redirect to the results page or show the generated questions
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to generate interview questions");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Focus the custom input when it appears
  useEffect(() => {
    if (showCustomTypeInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomTypeInput]);

  return (
    <Card className="w-full mx-auto mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Position</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the job description here..."
                      className="min-h-[220px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interview Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="15min">15min</SelectItem>
                      <SelectItem value="30min">30min</SelectItem>
                      <SelectItem value="45min">45min</SelectItem>
                      <SelectItem value="1hour">1hour</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label className="block mb-2">Interview Type</Label>
              <div className="flex flex-wrap gap-2">
                {Object.entries({
                  technical: "Technical",
                  behavioral: "Behavioral",
                  caseStudy: "Case Study",
                  rolePlay: "Role Play",
                  problemSolving: "Problem Solving",
                  systemDesign: "System Design",
                  codingChallenge: "Coding Challenge",
                  culturalFit: "Cultural Fit",
                  leadershipAssessment: "Leadership",
                  projectManagement: "Project Management",
                  dataAnalysis: "Data Analysis",
                  communicationSkills: "Communication",
                  stressInterview: "Stress Interview",
                  teamCollaboration: "Team Collaboration",
                }).map(([key, label]) => (
                  <div key={key} className="relative">
                    <input
                      type="checkbox"
                      id={key}
                      className="peer sr-only"
                      checked={
                        interviewTypes[key as keyof typeof interviewTypes]
                      }
                      onChange={() =>
                        toggleInterviewType(key as keyof typeof interviewTypes)
                      }
                    />
                    <label
                      htmlFor={key}
                      className="flex px-3 py-2 bg-background border rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground peer-checked:bg-primary peer-checked:text-primary-foreground transition-colors"
                    >
                      {label}
                    </label>
                  </div>
                ))}

                {/* Custom types that user has added */}
                {Object.entries(customTypes).map(([type, selected]) => (
                  <div key={type} className="relative ">
                    <input
                      type="checkbox"
                      id={`custom-${type}`}
                      className="peer sr-only"
                      checked={selected}
                      onChange={() => toggleCustomType(type)}
                    />
                    <label
                      htmlFor={`custom-${type}`}
                      className="flex px-3 py-2 bg-background border rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground peer-checked:bg-primary peer-checked:text-primary-foreground transition-colors"
                    >
                      {type}
                    </label>
                  </div>
                ))}

                {/* Custom type input field */}
                {showCustomTypeInput ? (
                  <div className="flex items-center gap-2">
                    <Input
                      ref={customInputRef}
                      value={customTypeValue}
                      onChange={(e) => setCustomTypeValue(e.target.value)}
                      onKeyDown={handleCustomTypeKeyDown}
                      placeholder="Enter custom type"
                      className="w-52 h-9"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-9 px-2"
                      onClick={handleAddCustomType}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-10"
                    onClick={() => setShowCustomTypeInput(true)}
                  >
                    <Plus className="h-4 w-4" /> Other
                  </Button>
                )}
              </div>
              {!hasSelectedInterviewType() && form.formState.isSubmitted && (
                <p className="text-sm font-medium text-destructive mt-2">
                  Please select at least one interview type
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between mt-8">
            <Button
              onClick={(e) => {
                e.preventDefault();
                form.reset();
                router.back();
              }}
              variant="ghost"
              size="lg"
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Questions <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
