"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { useAuthActions } from "@convex-dev/auth/react";

// Define the form validation schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Create form data for Convex password reset
      const formData = new FormData();
      formData.set("email", data.email);

      // Use Convex resetPassword method
      await signIn("password", formData)
        .catch((error: Error) => {
          console.error("Password reset error:", error);
          setAuthError(error.message || "An error occurred. Please try again.");
          toast("Password reset error");
        })
        .then(() => {
          setIsSuccess(true);
          toast("Password reset email sent");
        });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex min-h-[100dvh] items-center justify-center px-4 py-6 mx-auto bg-GREY_15 sm:py-8">
      <Card className="mx-auto w-full max-w-md border-GREY_30 hover:border-GREEN_60 transition-all duration-300 shadow-lg">
        <CardHeader className="space-y-1 px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
          <Logo />
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we&apos;ll send you a code to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-8">
          <div className="grid gap-6">
            {isSuccess ? (
              <div className="bg-green-500/20 border-2 border-green-500/50 rounded-md p-4 text-center">
                <p className="text-foreground mb-2">
                  Password reset email sent!
                </p>
                <p className="text-sm text-GREY_60">
                  Please check your email for instructions to reset your
                  password.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-GREY_90">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            {...field}
                            className="bg-background text-foreground border-GREY_30 focus:border-GREEN_60"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {authError && (
                    <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
                      <p className="text-foreground font-mono text-xs">
                        Error: {authError}
                      </p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full font-semibold h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset code"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 flex flex-col space-y-2">
          <div className="flex flex-row gap-2 justify-center">
            <span className="text-GREY_60">Remember your password?</span>
            <Link
              href="/signin"
              className="text-GREEN_60 hover:text-GREEN_70 underline hover:no-underline cursor-pointer"
            >
              Sign in instead
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
