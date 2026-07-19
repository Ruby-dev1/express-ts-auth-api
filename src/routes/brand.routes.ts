import express from "express";
import {
  create,
  getAll,
  getbyID,
  update,
  remove,
} from "../controllers/brand.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { ALL_Admins } from "../types/enum.types";
import { uploader } from "../middlewares/multer.middleware";
import {
  BrandbyIdSchema,
  BrandquerySchema,
  BrandValidateSchema,
  UpdateBrandSchema,
} from "../validators/brand.validators";
import { validate } from "../middlewares/validator.middleware";

const router = express.Router();
const upload = uploader();

//* create Brands

router.post(
  "/",
  upload.single("logo"),
  authenticate(ALL_Admins),
  validate(BrandValidateSchema),
  create,
);

//* getAllBrands

router.get("/", 
   validate(BrandquerySchema),
    getAll);

//* getBrandbyID & delete

router.get(
  "/:id",
  validate(BrandbyIdSchema),

  getbyID,
);

//* updateBrand

router.put(
  "/:id",
  upload.single("logo"),
  authenticate(ALL_Admins),
  validate(UpdateBrandSchema),
  update,
);

//* removeBrand

router.delete(
  "/:id",
  authenticate(ALL_Admins),
  validate(BrandbyIdSchema),

  remove,
);

export default router;
