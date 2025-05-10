"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

// Profile update schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z
    .string()
    .max(500, { message: "Bio must be less than 500 characters." })
    .optional(),
});

export default function ProfileComponent() {
  const user = useQuery(api.users.getMe);
  const updateProfileInfo = useMutation(api.users.updateProfileInfo);
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
  const saveImageToUser = useMutation(api.users.saveImageToUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [hasProfileChanges, setHasProfileChanges] = useState(false);

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  // Update form values when user data is loaded
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      });
      setAvatarSrc(
        `${user.imageUrl}` || "",
      );
    }
  }, [user, profileForm]);

  // Track profile form changes
  useEffect(() => {
    const subscription = profileForm.watch((value) => {
      if (!user) return;

      const hasChanges =
        value.name !== user.name ||
        value.email !== user.email ||
        value.bio !== (user.bio || ""); // Compare with empty string if user.bio is undefined

      setHasProfileChanges(hasChanges);
    });

    return () => subscription.unsubscribe();
  }, [profileForm, user]);

  // Handle profile update
  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsUpdating(true);

    // Call the API
    updateProfileInfo({
      name: values.name,
      bio: values.bio || "",
    })
      .then(() => {
        setIsUpdating(false);
        setHasProfileChanges(false);
        toast("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast("Failed to update profile");
        setIsUpdating(false);
      });
  }

  // Handle avatar upload
  async function handleImageUpload(file: File) {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const { storageId } = await result.json();

    // Step 3: Save the storage ID to the user record
    await saveImageToUser({ storageId, email: user?.email || "" });
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Profile</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarSrc || ""} alt="Profile" className="
                bg-cover bg-center
              "/>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="rounded-full bg-primary p-2 text-primary-foreground shadow-sm">
                  <Camera className="h-4 w-4" />
                </div>
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </div>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-semibold">
              {user?.name || "John Doe"}
            </h3>
            <p className="text-sm text-muted-foreground">{user?.email || ""}</p>
          </div>
        </div>

        <Separator />

        {/* Profile Form */}
        <div className="space-y-4 pt-4">
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <FormField
                control={profileForm.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the email others will see.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short bio about yourself. This will be displayed on your
                      profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUpdating || !hasProfileChanges}>
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUpdating ? "Updating..." : "Update profile"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
