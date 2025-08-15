import type { FieldMeta } from "@/types/form.types";

export const signupField: FieldMeta[] = [
  // {
  //   name: "first_name",
  //   label: "First Name",
  //   placeholder: "Enter your first name",
  //   type: "text",
  // },
  // {
  //   name: "last_name",
  //   label: "Last Name",
  //   placeholder: "Enter your first name",
  //   type: "text",
  // },
  // {
  //   name: "name",
  //   label: "Name",
  //   placeholder: "Enter your name.",
  //   type: "text",
  // },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Enter your password again",
    type: "password",
  },
];
