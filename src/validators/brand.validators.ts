import { z } from "zod";

//* create validator

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

//* update validator

export const UpdateBrandSchema = z.object({
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

  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid BrandId"),
  }),
  query: z.object({}).default({}),
});

//* get all

export const BrandquerySchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    query: z.string().optional(),
    sortBy: z.enum(["name", "createdAt", "updatedAt"]).default("createdAt"),

    order: z.enum(["ASC", "DES"]).default("DES"),

    page: z.number().int().min(1, "Page must be atleast 1").default(1),

    limit: z
      .number()
      .int()
      .min(1, "limit must be atleast 1")
      .max(100, "limit cannot exceed 100")
      .default(10),
  }),
});

//* get by id & delete

export const BrandbyIdSchema = z.object({
  body:z.object({}).default({}),
  params: z.object({
    id:z.string().regex(/^[0-9a-f-A-F]{24}$/,"Invalid BrandId"),
  }),
  query:z.object({}).default({}),

})
