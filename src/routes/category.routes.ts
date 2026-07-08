import express from "express";
import { getAll,getByID, create, update, remove } from "../controllers/user.controller";

const router = express.Router();

//* get all category

router.get("/", getAll);

//* get category by id

router.get("/:id", getByID);

//* create category/post

router.post("/", create);

//* update/put 

router.put("/:id", update);

//* delete

router.delete("/:id", remove);

export default router;