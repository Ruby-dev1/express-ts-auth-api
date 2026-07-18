import { z } from "zod";

export const wishlistValidateSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "productId is required"),
  }),
});

