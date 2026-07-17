import { z } from "zod";

export const ProductValidateSchema = z.object({
  body: z.object({
    name: z
      .string("name must be string")
      .min(3, "name must be atleast 3 characters long")
      .max(50, "name must not exceed 50 characters"),

    price: z.coerce.number(),

    description: z
      .string("description must be string")
      .min(10, "description must be atleast 10 characters long")
      .max(800, "description must not exceed 800 characters"),

    brand: z
    .string("brand must be string")
    .min(1, "Brand is required"),

    category: z
    .string("category must be string")
    .min(1, "category is required"),

    is_featured: z
    .coerce.boolean()
    .optional(),
  }),
  
});

export  const UpdateProductSchema = z.object({
    body:z.object({
         body: z.object({
    name: z
      .string("name must be string")
      .min(3, "name must be atleast 3 characters long")
      .max(50, "name must not exceed 50 characters"),

    price: z.coerce.number(),

    description: z
      .string("description must be string")
      .min(10, "description must be atleast 10 characters long")
      .max(800, "description must not exceed 800 characters"),

    brand: z
    .string("brand must be string")
    .min(1, "Brand is required"),

    category: z
    .string("category must be string")
    .min(1, "category is required"),

    is_featured: z
    .coerce.boolean()
    .optional(),
  }),
  
  deleted_images: z
  .array(z.string())
  .optional(),

    }),
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),

    }),
    query: z.object({}).default({}),
})


export const ProductIdSchema = z.object({
    body:z.object({}).default({}),
    params:z.object({
        id:z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid product ID"),
     }),
     query:z.object({}).default({})

});

export const CategoryIdSchema = z.object({
     body:z.object({}).default({}),
    params:z.object({
        id:z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid product ID"),
     }),
     query:z.object({}).default({})

    
})

export const BrandIdSchema = z.object({
    body:z.object({}).default({}),
    params:z.object({
        id:z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid product ID"),
     }),
     query:z.object({}).default({})


})