import express from "express";
import { getAll,getByID, create, update, remove, } from "../controllers/category.controller";
import { getByCategory,getByBrand,getByNewArrivals,getByfeatured } from "../controllers/product.controller";
import { upload } from "../utils/cloudinary.utils";
const router = express.Router();

//* get all product

router.get("/", getAll);

//* get product by id

router.get("/:id", getByID);

//* create product/post

router.post("/", create);

//* update/put 

router.put("/:id", update);

//* delete

router.delete("/:id", remove);

//* get by category
router.get("/category/:categoryId",getByCategory);

//* get by brand
router.get("/brand/:brandid",getByBrand);

//* get by new_arrivals
router.get("/new-arrivals", getByNewArrivals);

//* get by featured
router.get("/featured", getByfeatured);
export default router;