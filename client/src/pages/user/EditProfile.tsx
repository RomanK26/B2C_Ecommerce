import { Button } from "@/components/ui/button";
import useFetchUser from "@/features/user/hooks/useFetchUser";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { UserProfile } from "./schemas/userSchemas";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import logo from "/logo.png";
import { useUpdateUser } from "@/features/user/hooks/useUpdateUser";
import { PlusCircle, X } from "lucide-react";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const { data, isLoading } = useFetchUser();
  const { mutate } = useUpdateUser();
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfile>({
    values: data,
  });
  useEffect(() => {
    if (data) {
      reset(data.data);
    }
  }, [data, reset]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (formData: UserProfile) => {
    console.log("Updated data:", formData);
    mutate({ formData });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex w-full">
      <X
        className="absolute top-3 right-2 size-8 rounded-full bg-gray-100 p-1 hover:cursor-pointer"
        onClick={handleClose}
      ></X>
      <Card className="w-full flex-1 px-5">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex size-12 overflow-hidden rounded-full border md:size-24">
                <img
                  src={logo}
                  // src={preview || data?.profile_image || {logo}}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="group w-16"
                placeholder="Add"
              />
            </div>

            {/* Username */}
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Enter username"
                {...register("username")}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* First Name */}
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                placeholder="Enter first name"
                {...register("first_name")}
              />
            </div>

            {/* Last Name */}
            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                placeholder="Enter last name"
                {...register("last_name")}
              />
            </div>

            {/* Address */}
            <div>
              <Label>Address</Label>
              <Textarea placeholder="Enter address" {...register("address")} />
            </div>

            <div className="flex justify-between">
              <Button
                variant={"secondary"}
                className="hover:cursor-pointer"
                type="button"
                onClick={() => navigate("/admin/user-profile/change-password/")}
              >
                Change password
              </Button>
              <Button type="submit" className="hover:cursor-pointer">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
