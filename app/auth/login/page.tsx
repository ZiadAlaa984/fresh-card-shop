"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Route from "@/config/routes";
import Link from "next/link";
import { z } from "zod";
import { formSchema, useLoginForm } from "./scheme";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginReq } from "@/Service/auth";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { setAuthCookies } = useAuth();
  const form = useLoginForm();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: LoginReq,
    onSuccess: (res) => {
      setAuthCookies(res);
      toast(res.message);
    },
    onError: (error) => {
      toast(error.message);
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      await mutateAsync({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
        <p className="mt-4 text-xl font-bold tracking-tight">Log in</p>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full"
                      {...field}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="mt-4 w-full">
              Continue
            </Button>
          </form>
        </Form>

        <div className="mt-5 space-y-5">
          <Link
            href="#"
            className="text-sm block underline text-muted-foreground text-center"
          >
            Forgot your password?
          </Link>
          <p className="text-sm text-center">
            Don&apos;t have an account?
            <Link
              href={Route.auth.signup}
              className="ml-1 underline text-muted-foreground"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
