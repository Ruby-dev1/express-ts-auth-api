import express from "express";
import { getAll,getByID, create, update, remove, } from "../controllers/category.controller";
import { getByCategory,getByBrand,getByNewArrivals,getByfeatured } from "../controllers/product.controller";
import { uploader } from "../middlewares/multer.middleware";
const router = express.Router();
const upload = uploader();

//* get all product

router.get("/", getAll);

//* get product by id

router.get("/:id", getByID);

//* create product/post

router.post("/", upload.fields([{
    name:"cover_image",
    maxCount: 1 ,
},
{
    name: "images",
    maxCount: 10,
}

]),create
);

//* update/put 

router.put("/:id", update);

//* delete

router.delete("/:id", remove);

//* get by category
router.get("/category/:categoryId",getByCategory);

//* get by brand
router.get("/brand/:brandId",getByBrand);

//* get by new_arrivals
router.get("/new-arrivals", getByNewArrivals);

//* get by featured
router.get("/featured", getByfeatured);
export default router;