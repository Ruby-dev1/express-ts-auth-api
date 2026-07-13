import express from "express";
import { getAll,getByID, create, update, remove } from "../controllers/category.controller";

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

export default router;