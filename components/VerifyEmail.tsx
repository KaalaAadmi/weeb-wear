"use client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
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

interface VerifyEmailProps {
  // token?: string;
  // setCode: (code: string) => void;

  pendingVerification?: boolean;
  setPendingVerification: (pendingVerification: boolean) => void;
}
const VerifyEmail = ({
  // token,
  // setCode,
  pendingVerification,
  setPendingVerification,
}: VerifyEmailProps) => {
  const form = useForm({
    defaultValues: {
      code: "",
    },
  });
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const { signUp, setActive } = useSignUp();

  const onPressVerify = async (data: any) => {
    // Prevent page refresh
    event?.preventDefault();
    const code = data.code;
    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp?.status !== "complete") {
        setError("Verification code is incorrect");
      }
      if (completeSignUp?.status === "complete") {
        if (setActive) {
          setActive({ session: completeSignUp?.createdSessionId });
        }
        setPendingVerification(false);
        router?.push("/?verified=true");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // function onSubmit(data: any) {
  //   toast.success("You submitted the following values:", {
  //     description: data.code,
  //   });
  // }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative mb-4 h-60 w-60 text-muted-foreground">
        <Image
          src="/assets/images/hippo-email-sent.png"
          fill
          alt="the email was sent"
        />
      </div>

      <h3 className="font-semibold text-2xl">Enter your code</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onPressVerify)}
          className="w-2/3 space-y-6 flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP {...field} maxLength={6}>
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
                </FormControl>
                <FormDescription className="text-center">
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default VerifyEmail;
