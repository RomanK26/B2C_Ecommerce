import type { SignupFormInputs } from "@/features/auth/schemas/authSchemas";
import React from "react";
import type { UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  name: keyof SignupFormInputs;
  label: string;
  error?: string;
  register?: UseFormRegister<SignupFormInputs>;
  type?: string;
  placeholder?: string;
};

const InputBox: React.FC<InputFieldProps> = ({
  label,
  error,
  register,
  type,
  placeholder,
  name,
}) => {
  return (
    <div className="mb-4">
      {" "}
      <label className="mb-1 block leading-6 font-medium tracking-wide">
        {label}
      </label>
      <input
        {...register!(name)}
        type={type}
        className="w-full border p-2"
        placeholder={placeholder}
      />
      {error && <p className="font-l mt-0.5 leading-5 text-red-500">{error}</p>}
    </div>
  );
};

export default InputBox;
