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

const router = express.Router();
const upload = uploader();


//* get all product
router.get("/", getAll);


//* get by category
router.get("/category/:categoryId", getByCategory);


//* get by brand
router.get("/brand/:brandId", getByBrand);


//* get by new arrivals
router.get("/new-arrivals", getByNewArrivals);


//* get by featured
router.get("/featured", getByfeatured);


//* get product by id
// keep this at the bottom
router.get("/:id", getByID);


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
    create
);


//* update
router.put("/:id", update);


//* delete
router.delete("/:id", remove);


export default router;