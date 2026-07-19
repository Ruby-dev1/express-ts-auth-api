import { z } from "zod";

//* create

export const CartValidateSchema = z.object({
  body: z.object({
    productId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID")
      .min(1, "ProductId must be atleast 1"),

    quantity: z.coerce
    .number()
    .int()
    .min(1, "Quantity is required")
    .default(1),

  }),

  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

//* update

export const UpdateCartSchema = z.object({
  body: z.object({
    productId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID")
      .min(1, "ProductId must be atleast 1"),

    quantity: z.coerce
    .number()
    .int()
    .min(1, "Quantity must be at least 1"),
  }),

  params: z.object({}).default({}),
  query: z.object({}).default({}),
});


//* delete 
export const CartProductIdSchema = z.object({
  body: z.object({}).default({}),

  params: z.object({
    productId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
  }),

  query: z.object({}).default({}),
});