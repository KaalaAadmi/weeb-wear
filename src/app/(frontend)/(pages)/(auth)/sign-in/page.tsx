"use client";

import { Icons } from "@/components/icons/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
// import { ArrowRight, Loader2 } from "lucide-react";
import {
  ArrowRightIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import { useSignIn } from "@clerk/nextjs";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useAuth } from "@/context/auth-context";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const searchParams = useSearchParams()

  //   const { isLoaded, signIn, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  // ;('use server')
  const onSubmit = async (data: any) => {
    const { email, password } = data;
    console.log(email, password);
    event?.preventDefault();
    // const redirect = searchParams.get('redirect')
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    try {
      await login(data);
      clearTimeout(timer);
      // if (redirect) router.push('/?signedIn=true')
      router.push(`/?signedIn=true`);
    } catch (e: any) {
      console.log(e);
      clearTimeout(timer);
      setError(
        "There was an error with the credentials provided. Please try again."
      );
    }
  };
  return (
    <MaxWidthWrapper className="h-full">
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account?
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                {/* Email Field */}
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                {/* Password Field with Show/Hide */}
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type={showPassword ? "text" : "password"}
                      className={cn({
                        "focus-visible:ring-red-500": errors.password,
                      })}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors?.password?.message as string}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Submit Button */}
                <Button variant={"primary"} disabled={isLoading}>
                  {isLoading && (
                    <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </Suspense> */}
    </MaxWidthWrapper>
  );
};

export default Page;
