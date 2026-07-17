import express from "express";
import { create,getAll,getbyID,update, remove} from "../controllers/brand.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {ALL_Admins, } from "../types/enum.types"
import { uploader } from "../middlewares/multer.middleware";
import { BrandValidateSchema } from "../validators/brand.validators";
import { validate } from "../middlewares/validator.middleware";

const router = express.Router();
const upload = uploader();

//* create Brands

 router.post("/",
     upload.single("logo"),
     authenticate(ALL_Admins),
     validate(BrandValidateSchema),
     create);

 //* getAllBrands

 router.get("/", getAll);

 //* getBrandbyID

 router.get("/:id", getbyID);

 //* updateBrand

 router.put("/:id", 
    upload.single("logo"),
    authenticate(ALL_Admins),
    validate(BrandValidateSchema),
    update);

 //* removeBrand

 router.delete("/:id", 
    authenticate(ALL_Admins),
    remove);

 export default router;