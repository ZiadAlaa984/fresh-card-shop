"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Route from "@/config/routes";
// import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const formSchema = z.object({
//   email: z.string().email(),
// });

const ForgetPassword = () => {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   defaultValues: {
  //     email: "",
  //   },
  //   resolver: zodResolver(formSchema),
  // });

  // const onSubmit = (data: z.infer<typeof formSchema>) => {
  //   console.log(data);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
        <p className="mt-4 text-xl font-bold tracking-tight">Log in</p>

        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

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

export default ForgetPassword;
