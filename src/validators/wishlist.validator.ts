import { z } from "zod";

//* create

export const wishlistValidateSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "productId is required"),
  }),

  params: z.object({}).default({}),

  query: z.object({}).default({}),

});

//* update
export const UpdateWishlistSchema = z.object({
    body: z.object({
    productId: z
    .string().
    min(1, "productId is required"),
  }),

  params: z.object({}).default({}),

  query: z.object({}).default({}),


})


//* delete productId

export const WishlistProductIdSchema = z.object({
  body: z.object({}).default({}),

  params: z.object({
    productId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
  }),

  query: z.object({}).default({}),
});
