import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import  useAddProduct  from "@/features/products/hooks/useAddProduct";

// Define the schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, { message: "Price must be a positive number." }),
  quantity: z.coerce.number().int().min(1, { message: "Quantity must be at least 1." }),
  category: z.string(),
  image: z.array(z.instanceof(File)).min(1, { message: "Please select at least one image." }),
});


export default function AddProduct() {
  const { mutate, isPending } = useAddProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 1,
      category: "",
      image: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description ?? "");
    formData.append("price", values.price.toString());
    formData.append("quantity", values.quantity.toString());
    formData.append("category", values.category);

    values.image.forEach((file) => formData.append("image", file));
    console.log(values.category)
    console.log('form ',formData)

    mutate({ formData });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          {/* Price */}
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Quantity */}
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantity" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Clothes</SelectItem>
                      <SelectItem value="2">Books</SelectItem>
                      <SelectItem value="3">Shoes</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    const selectedFiles = event.target.files
                      ? Array.from(event.target.files)
                      : [];
                    onChange(selectedFiles);
                  }}
                  className="block w-full text-sm file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium file:bg-muted hover:file:bg-muted/80"
                />
              </FormControl>
              <FormDescription>Select one or more images.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
