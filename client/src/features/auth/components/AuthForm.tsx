import InputBox from "@/components/InputBox";
import { signupField } from "@/features/auth/constants/auth.constants";
import type { FormData } from "@/types/form.types";
import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type AuthFormProps = {
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
};

const AuthForm: React.FC<AuthFormProps> = ({ errors, register ,fields}) => {
  return (
    <div>
      {fields.map((field) => (
        <InputBox
          key={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          error={errors[field.name]?.message}
          register={register}
          name={field.name}
        ></InputBox>
      ))}
    </div>
  );
};

export default AuthForm;
