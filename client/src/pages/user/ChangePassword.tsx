import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/features/user/hooks/useUpdatePassword";
import React from "react";
import { useForm } from "react-hook-form";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "./schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

const ChangePassword = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });
  const { mutate } = useUpdatePassword();

  const onSubmit = (values) => {
    console.log("password", values);
    mutate(values);
  };
  return (
    <div className="mx-auto w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input placeholder="old passowrd" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="New passowrd" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Change Password</Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
