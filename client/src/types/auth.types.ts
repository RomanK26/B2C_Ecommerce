import type { FormData } from "./form.types";



export type authState = {
  isAuthenticated:boolean;
  user: FormData;
  loading: boolean;
  error: string | null;
};