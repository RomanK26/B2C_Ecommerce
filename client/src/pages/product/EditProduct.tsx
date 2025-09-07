import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
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
import { formSchema } from "@/features/admin/schemas/adminSchemas";
import { Link, useParams } from "react-router";
import { useProductDetail } from "@/features/products/hooks/useFetchProductDetail";
import { useEditProduct } from "@/features/products/hooks/useEditProduct";
import { useCategory } from "@/utils/categoryDropDown";
import ProductPreview from "@/features/products/components/ProductPreview";

const EditProduct = () => {
  const { id } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      quantity: 0,
      category: undefined,
      image: [],
    },
  });

  const [files, setFiles] = useState(null);
  const { data, isLoading } = useProductDetail(Number(id), form);
  const { mutate } = useEditProduct();
  const categories = useCategory();

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.data.name,
        description: data.data.description,
        price: data.data.price,
        quantity: data.data.quantity,
        category: data.data.category,
        image: data.data.image || [],
      });
    }
  }, [data, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (values) => {
    mutate({ id, data: values });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/admin/products">Products</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the product Name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the product's public display name.
                </FormDescription>
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
                    placeholder="Enter the details."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? field.value.toString() : ""}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const selectedFiles = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                      setFiles(selectedFiles);
                      field.onChange(selectedFiles);
                    }}
                    className="file:bg-muted hover:file:bg-muted/80 text-muted-foreground block w-full text-sm file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
                  />
                </FormControl>
                <FormDescription>Select new files to upload. Existing images are shown below.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ProductPreview images={data?.data.images}></ProductPreview>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProduct;
