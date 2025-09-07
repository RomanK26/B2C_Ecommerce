import AuthForm from "@/features/auth/components/AuthForm";
import { loginField } from "@/features/auth/constants/auth.constants";
import { useLogin } from "@/features/auth/hooks/useLogin";
import {
  loginSchema,
  type LoginFormInputs,
} from "@/features/auth/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LineSpinner } from "ldrs/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const LoginPage = () => {
  const {data, mutate, isPending } = useLogin();
  console.log(data)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data);
  };

  if (isPending) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 px-6 sm:px-12 md:flex-row md:gap-32">
      {/* Image Section */}
      {/* <div
        className="h-32 w-56 bg-contain bg-center bg-no-repeat sm:h-48 sm:w-48 md:h-156 md:w-2/5"
        style={{ backgroundImage: `url(${SignUpLogo})` }}
      ></div> */}

      {/* Form Section */}
      <div className="w-full max-w-md p-4 sm:p-6 md:w-1/3">
        <h1 className="mb-4 text-center text-2xl font-bold md:text-left">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AuthForm errors={errors} register={register} fields={loginField} />

          {/* {isError && <p className="text-sm font-thin text-red-500">{error.data.message}</p>} */}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isPending ? (
              <LineSpinner size="25" stroke="3" speed="1" color="black" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link to={"/signup"} className="mx-auto w-full text-blue-950">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
