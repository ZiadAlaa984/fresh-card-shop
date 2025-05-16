"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import User from "@/public/imgs/download.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/shared/Header";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserData, updateMe, verifyToken } from "@/Service/user";
import type { userInfo, UserResponse } from "@/types/user";
import type { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { type formSchema, useInfoScheme } from "./scheme";
import { toast } from "sonner";
import { useUserContext } from "@/app/context/UserContext";

export default function UpdateInfo() {
  const { getToken } = useAuth();
  const [userId, setUserId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profileImage, setProfileImage } = useUserContext();

  // Use the form hook with Zod validation
  const form = useInfoScheme();

  // Fetch user ID once on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const data = await verifyToken(getToken());
        const id = data?.decoded?.id;
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    fetchUserId();
  }, [getToken]);

  // Fetch user data with React Query
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<UserResponse>({
    queryKey: ["user", userId],
    queryFn: () => getUserData(getToken(), userId),
    enabled: !!userId, // Only run query when userId is available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update form values when user data changes
  useEffect(() => {
    if (userData?.data) {
      form.reset({
        name: userData.data.name || "",
        email: userData.data.email || "",
        phone: userData.data.phone || "",
      });
    }
  }, [userData, form]);

  const { mutateAsync, isPending } = useMutation<
    userInfo,
    Error,
    { name: string; email: string; phone: string }
  >({
    mutationFn: (values) => {
      return updateMe(getToken(), values); // Ensure this returns a Promise
    },
    onSuccess: (res) => {
      console.log(res);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync(values);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        // Save to state
        setProfileImage(imageDataUrl);

        // Save to local storage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("setProfileImage", imageDataUrl);
            toast.success("Profile image saved locally");
          } catch (error) {
            // Handle potential localStorage quota exceeded error
            console.error("Error saving image to local storage:", error);
            toast.error(
              "Failed to save image locally. The image might be too large."
            );
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Header className={""} title={"Info"}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Header>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Header className={""} title={"Info"}>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">
            Error loading profile data. Please try again.
          </div>
        </div>
      </Header>
    );
  }
  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={User || "/placeholder.svg"}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <Button variant="outline" className="mt-4" onClick={handleImageClick}>
            Upload Photo
          </Button>
        </div>
        {/* Personal Details Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Personal Details
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className=" text-white"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
