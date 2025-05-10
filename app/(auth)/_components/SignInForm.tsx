"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuthActions } from "@convex-dev/auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useTheme } from "next-themes";
import Logo from "@/components/Logo";

// Define the form validation schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const { theme } = useTheme();
  console.log(theme);

  const router = useRouter();
  // In your login component
  const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Create form data for Convex password auth
      const formData = new FormData();
      formData.set("email", data.email);
      formData.set("password", data.password);
      formData.set("flow", "signIn");

      // Use Convex signIn method with password
      await signIn("password", formData)
        .catch((error) => {
          console.error("Sign in error:", error);
          setAuthError(
            error.message ||
              "An error occurred during sign in. Please try again.",
          );
          toast("Sign in error");
        })
        .then(() => {
          toast("Sign in successful");
          router.push("/dashboard");
        });
    } finally {
      setIsLoading(false);
    }
  }

  // Handle GitHub sign-in
  const handleGithubSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Use Convex signIn method with GitHub provider
      await signIn("github", { redirectTo: "/dashboard" });
    } catch (error) {
      console.error("GitHub sign in error:", error);
      setAuthError(
        "An error occurred during GitHub sign in. Please try again.",
      );
      toast("Sign in error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[100dvh] items-center justify-center px-4 py-6 mx-auto bg-GREY_15 sm:py-8">
      <Card className="mx-auto w-full max-w-md border-GREY_30 hover:border-GREEN_60 transition-all duration-300 shadow-lg">
        <CardHeader className="space-y-1 px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
          <Logo />
          <CardTitle className="text-xl sm:text-2xl font-bold  text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className=" text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-8">
          <div className="grid gap-6">
            <div className="">
              {/* <Button
                variant="outline"
                className="w-full border-GREY_30 hover:border-GREEN_60 hover:bg-GREEN_60/10  hover:text-GREEN_60 transition-all h-11"
                onClick={() => signIn("google", { redirectTo: "/dashboard" })}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button> */}
              <Button
                variant="outline"
                className="w-full border-GREY_30 hover:border-GREEN_60 hover:bg-GREEN_60/10 hover:text-GREEN_60 transition-all h-11"
                onClick={handleGithubSignIn}
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-GREY_30" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-GREY_60">
                  Or continue with
                </span>
              </div>
            </div>

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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-GREY_90">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="bg-background text-foreground border-GREY_30 focus:border-GREEN_60"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start  space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                            className="data-[state=checked]:bg-GREEN_60 data-[state=checked]:border-GREEN_60"
                          />
                        </FormControl>
                        <div className="leading-none">
                          <FormLabel className="text-GREY_90">
                            Remember me
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  {/* <Link
                    href="/forgot-password"
                    className="text-sm text-GREEN_60 hover:text-GREEN_70 underline hover:no-underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                {authError && (
                  <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
                    <p className="text-foreground font-mono text-xs">
                      Error signing in: {authError}
                    </p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full font-semibold h-11"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 flex flex-col space-y-2">
          <div className="flex flex-row gap-2 justify-center">
            <span className="text-GREY_60">Don&apos;t have an account?</span>
            <Link
              href="/signup"
              className="text-GREEN_60 hover:text-GREEN_70 underline hover:no-underline cursor-pointer"
            >
              Sign up instead
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInForm;
