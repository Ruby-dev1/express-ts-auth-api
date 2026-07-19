import express from "express";
import { getAll,getByID, create, update, remove } from "../controllers/category.controller";import { authenticate } from "../middlewares/auth.middleware";
import {ALL_Admins, } from "../types/enum.types"
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { CategorybyIdSchema, CategoryquerySchema, CategoryValidateSchema, UpdateCategorySchema } from "../validators/category .validators";
const router = express.Router();
const upload = uploader();
//* get all category

router.get("/", getAll,
    validate(CategoryquerySchema)
);

//* get category by id

router.get("/:id", 
    getByID,
    validate(CategorybyIdSchema),
);

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
    validate(UpdateCategorySchema),
     update);

//* delete

router.delete("/:id",
    authenticate(ALL_Admins),
    validate(CategorybyIdSchema),
     remove);

export default router;