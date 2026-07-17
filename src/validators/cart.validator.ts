import{z} from "zod";

export const CartValidateSchema = z.object({
    body:z.object({

        proudctId: z
        .string()
        .min(1, "productId is required"),

        quantity:z
        .coerce.number()
        .min(1, "Quantity is required")
        .default(1),

    })
})