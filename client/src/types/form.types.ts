export interface FormData {
  // name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FieldMeta {
  name: keyof FormData;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
}
