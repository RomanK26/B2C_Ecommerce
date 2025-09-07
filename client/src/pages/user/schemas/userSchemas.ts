import { z } from "zod";

export const changePasswordSchema = z.object({
  old_password: z.string().min(6, { message: "Old password is required and must be 8 characters." }),
  new_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export type UserProfile = {
  id: number;
  username: string | null;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  address: string;
};
