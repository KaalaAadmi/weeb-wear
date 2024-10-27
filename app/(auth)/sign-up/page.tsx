"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import VerifyEmail from "@/components/VerifyEmail";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // const onSubmit = async ({
  //   e,
  //   name,
  //   emailAddress,
  //   password,
  //   confirmPassword,
  // }: {
  //   e: Event;
  //   name: string;
  //   emailAddress: string;
  //   password: string;
  //   confirmPassword: string;
  // }) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   if (!isLoaded) return;
  //   if (!emailAddress || !password) return;
  //   try {
  //     if (password === confirmPassword) {
  //       await signUp.create({
  //         firstName: name.split(" ")[0].toString(),
  //         lastName: name.split(" ")[1].toString(),
  //         emailAddress,
  //         password,
  //       });
  //       await signUp.prepareEmailAddressVerification({
  //         strategy: "email_code",
  //       });
  //       setPendingVerification(true);
  //     } else {
  //       setError("Passwords do not match");
  //     }
  //   } catch (error: any) {
  //     console.log(JSON.stringify(error, null, 2));
  //     setError(error.errors[0].message);
  //   }
  //   setIsLoading(false);
  // };
  const onSubmit = async (data: any) => {
    const { name, email, password, confirmPassword } = data;
    const firstName = name?.split(" ")[0]?.toString() || undefined;
    const lastName = name?.split(" ")[1]?.toString() || undefined;
    console.log(firstName, lastName);
    // Prevent page refresh
    event?.preventDefault();

    setIsLoading(true);
    if (!isLoaded) return;
    if (!email || !password) return;

    try {
      if (password === confirmPassword) {
        await signUp.create({
          emailAddress: email,
          password,
        });
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, email }),
          }
        );
        const data = await response.json();
        if (data.message === "User added successfully") {
          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });
          setPendingVerification(true);
        } else {
          setError(data.message);
        }
      } else {
        setError("Passwords do not match");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0]?.longMessage);
    }
    setIsLoading(false);
  };

  return (
    <MaxWidthWrapper>
      <div className="container relative flex py-20 flex-col items-center justify-center lg:px-0">
        {!pendingVerification && (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Icons.logo className="h-20 w-20" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>

              <Link
                className={buttonVariants({
                  variant: "link",
                  className: "gap-1.5",
                })}
                href="/sign-in"
              >
                Already have an account? Sign-in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      {...register("name", { required: "Name is required" })}
                      className={cn({
                        "focus-visible:ring-red-500": errors.name,
                      })}
                      placeholder="John Doe"
                    />
                    {errors?.name && (
                      <p className="text-sm text-red-500">
                        {errors?.name.message as string}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email", { required: "Email is required" })}
                      className={cn({
                        "focus-visible:ring-red-500": errors.email,
                      })}
                      placeholder="you@example.com"
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">
                        {errors?.email.message as string}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type="password"
                      className={cn({
                        "focus-visible:ring-red-500": errors.password,
                      })}
                      placeholder="Password"
                    />
                    {errors?.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                      })}
                      type="password"
                      className={cn({
                        "focus-visible:ring-red-500": errors.confirmPassword,
                      })}
                      placeholder="Confirm Password"
                    />
                    {errors?.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword.message as string}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p className="text-sm text-red-500">{error as string}</p>
                  )}
                  <Button disabled={isLoading} className="mt-4">
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign up
                  </Button>{" "}
                </div>
              </form>
            </div>
          </div>
        )}
        {pendingVerification && (
          <VerifyEmail
            // code={code}
            // setCode={setCode}
            pendingVerification={pendingVerification}
            setPendingVerification={setPendingVerification}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
