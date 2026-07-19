import express from "express";
import {
  Add_Cart,
  Get_Cart,
  Update_Cart,
  Remove_Cart,
  Clear_Cart,
} from "../controllers/cart.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validator.middleware";
import {
  CartProductIdSchema,
  CartValidateSchema,
  UpdateCartSchema,
} from "../validators/cart.validator";
import { User_Only } from "../types/enum.types";

const router = express.Router();

//* Add product to cart
router.post(
  "/",
  authenticate(User_Only),
  validate(CartValidateSchema),
  Add_Cart,
);

//* Get logged-in user's cart
router.get("/", authenticate(), Get_Cart);

//* Update product quantity
router.put("/", authenticate(), 
validate(UpdateCartSchema),
 Update_Cart);

// *Remove a product from cart
router.delete(
  "/:productId",
  authenticate(),
  validate(CartProductIdSchema),
  Remove_Cart,
);

//* Clear entire cart
router.delete("/", authenticate(), Clear_Cart);

export default router;
