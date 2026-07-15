import express from "express";
import { getAll,getByID, create, update, remove } from "../controllers/category.controller";import { authenticate } from "../middlewares/auth.middleware";
import {ALL_Admins, } from "../types/enum.types"
import { uploader } from "../middlewares/multer.middleware";
const router = express.Router();
const upload = uploader();
//* get all category

router.get("/", getAll);

//* get category by id

router.get("/:id", getByID);

//* create category/post

router.post(
    "/",
    authenticate(ALL_Admins),
    upload.single("logo"),
    create
);

//* update/put 

router.put("/:id",authenticate(ALL_Admins), update);

//* delete

router.delete("/:id",authenticate(ALL_Admins), remove);

export default router;