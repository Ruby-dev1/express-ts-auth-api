import express from "express";
import { getAll,getByID, create, update, remove } from "../controllers/category.controller";import { authenticate } from "../middlewares/auth.middleware";
import {ALL_Admins, } from "../types/enum.types"

const router = express.Router();

//* get all category

router.get("/", getAll);

//* get category by id

router.get("/:id", getByID);

//* create category/post

router.post("/", authenticate(ALL_Admins),create);

//* update/put 

router.put("/:id",authenticate(ALL_Admins), update);

//* delete

router.delete("/:id",authenticate(ALL_Admins), remove);

export default router;