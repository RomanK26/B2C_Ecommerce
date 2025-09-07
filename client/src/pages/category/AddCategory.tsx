import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categorySchema } from "@/features/admin/schemas/adminSchemas";
import { Link, useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import useUpdateCategory from "@/features/category/hooks/useUpdateCategory";

import { useFetchCategoryDetail } from "@/features/category/hooks/useFetchCategoryDetail";
import { useAddCategory } from "@/features/category/hooks/useAddCategory";

function AddCategory() {
  const { id } = useParams();

  const { mutate } = useAddCategory();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    mutate(values);
  }

  return (
    <>
      <div className="flex justify-between p-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="../">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/admin/category/">Category</Link>
            </BreadcrumbItem>

            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link to="/admin/category/add/">add</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-8 py-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Category." type="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the description."
                    type=""
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default AddCategory;
