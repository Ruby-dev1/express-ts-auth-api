import { z } from "zod";

//* create 

export const CategoryValidateSchema = z.object({
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

//* get all

export const CategoryquerySchema = z.object({
  body:z.object({}).default({}),
  params:z.object({}).default({}),
  query:z.object({
    query:z.string({}).optional(),

      sortBy: z
      .enum(["name", "createdAt", "updatedAt"])
      .default("createdAt"),

      order:z
      .enum(["ASC","DES"])
      .default("DES"),

      page: z
      .number()
      .int()
      .min(1, "Page must be atleast 1")
      .default(1),

      limit:z
      .number()
      .int()
      .min(1,"limit must be atleast 1")
      .max(100,"limit cannot exceed 100")
      .default(10),



  }),
})


//* update

export const UpdateCategorySchema = z.object({
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
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid CategoryId"),
  }),

  query: z.object({}).default({}),
});


//* get by id & delete

export const CategorybyIdSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid CategoryId"),
  }),
  query: z.object({}).default({}),
});
