import { z } from "zod";
export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  quantity: z.coerce.number().min(1),
  category: z.coerce.number("Please select a category." ).min(1),
  image: z.array(z.instanceof(File)).optional()
});


export const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
});