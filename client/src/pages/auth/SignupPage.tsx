import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupFormInputs,
} from "@/features/auth/schemas/authSchemas";
import { useDispatch } from "react-redux";
import AuthForm from "@/features/auth/components/AuthForm";
import type { AppDispatch } from "@/app/store";
import SignUpLogo from "@/assets/SigunUp.png";
import { Link } from "react-router";

import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";
import { useSignup } from "@/features/auth/hooks/useSignup";

// Default values shown

export default function SignupPage() {
  console.log("signup page loaded");
  const dispatch = useDispatch<AppDispatch>();
  const { mutate, isPending, isError, error, isSuccess } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormInputs) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 px-6 sm:px-12 md:flex-row md:gap-32">
      {/* Image Section */}
      <div
        className="h-32 w-56 bg-contain bg-center bg-no-repeat sm:h-48 sm:w-48 md:h-156 md:w-2/5"
        style={{ backgroundImage: `url(${SignUpLogo})` }}
      ></div>

      {/* Form Section */}
      <div className="w-full max-w-md p-4 sm:p-6 md:w-1/3">
        <h1 className="mb-4 text-center text-2xl font-bold md:text-left">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AuthForm errors={errors} register={register} />

          {/* {isError && <p className="text-sm font-thin text-red-500">{error.data.message}</p>} */}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isPending ? (
              <LineSpinner size="25" stroke="3" speed="1" color="black" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="mx-auto w-full text-blue-950">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
