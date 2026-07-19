import express  from "express";
import {
  Add_Wishlist,
  Get_Wishlist,
  Remove_Wishlist,
  Clear_Wishlist,
} from "../controllers/wishlist.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { WishlistProductIdSchema, wishlistValidateSchema } from "../validators/wishlist.validator";
import { validate } from "../middlewares/validator.middleware";

const router = express.Router();

router.post("/", authenticate(),validate(wishlistValidateSchema), Add_Wishlist);
router.get("/", authenticate(), Get_Wishlist);
router.delete("/:productId", authenticate(),validate(WishlistProductIdSchema), Remove_Wishlist);
router.delete("/", authenticate(), Clear_Wishlist);

export default router;