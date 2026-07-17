import { z } from "zod";

export const BrandValidateSchema = z.object({
  body: z.object({
    name: z
      .string("name must be string")
      .trim()
      .min(2, "name must be atleast 3 characters long")
      .max(50, "names must not exceed 50 characters"),

    description: z
      .string("description must be string")
      .trim()
      .min(25, "description must be atleast 25 characters long")
      .max(800, "description must not excedd 800 characters"),
  }),
});

export const UpdateBrandSchema = z.object({
  body:z.object({
     name: z
      .string("name must be string")
      .trim()
      .min(2, "name must be atleast 3 characters long")
      .max(50, "names must not exceed 50 characters"),

    description: z
      .string("description must be string")
      .trim()
      .min(25, "description must be atleast 25 characters long")
      .max(800, "description must not excedd 800 characters"),
  }),

  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid BrandId"),
  }),
  query: z.object({}).default({})
  })
