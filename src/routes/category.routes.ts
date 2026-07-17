import express from "express";
import { getAll,getByID, create, update, remove } from "../controllers/category.controller";import { authenticate } from "../middlewares/auth.middleware";
import {ALL_Admins, } from "../types/enum.types"
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { CategoryValidateSchema } from "../validators/category .validators";
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
    validate(CategoryValidateSchema),
    create
);

//* update/put 

router.put("/:id",
    authenticate(ALL_Admins),
    validate(CategoryValidateSchema),
     update);

//* delete

router.delete("/:id",authenticate(ALL_Admins), remove);

export default router;