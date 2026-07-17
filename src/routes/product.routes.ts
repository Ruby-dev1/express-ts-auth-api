import express from "express";
import { 
    getAll,
    getByID,
    create,
    update,
    remove,
    getByCategory,
    getByBrand,
    getByNewArrivals,
    getByfeatured
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { ALL_Admins } from "../types/enum.types";

import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { BrandIdSchema, CategoryIdSchema, ProductIdSchema, ProductValidateSchema, UpdateProductSchema } from "../validators/product.validators";

const router = express.Router();
const upload = uploader();


//* get all product
router.get("/", getAll);


//* get by category
router.get("/category/:categoryId",
    validate(CategoryIdSchema),
     getByCategory);


//* get by brand
router.get("/brand/:brandId",
    validate(BrandIdSchema),
     getByBrand);


//* get by new arrivals
router.get("/new-arrivals", getByNewArrivals);


//* get by featured
router.get("/featured", getByfeatured);


//* get product by id
// keep this at the bottom
router.get("/:id", 
    validate(ProductIdSchema),
    getByID);


//* create product
router.post(
    "/",
    upload.fields([
        {
            name:"cover_image",
            maxCount:1
        },
        {
            name:"images",
            maxCount:10
        }
    ]),
    authenticate(ALL_Admins),
    validate(ProductValidateSchema),
    create
);


//* update
router.put("/:id", 
    upload.fields([
        {
            name:"cover_image",
            maxCount:1
        },{
            name:"images",
            maxCount:10
        }
    ]),
    authenticate(ALL_Admins),
    validate(UpdateProductSchema),
    update);


//* delete
router.delete("/:id",
    validate(ProductIdSchema),
     remove);


export default router;