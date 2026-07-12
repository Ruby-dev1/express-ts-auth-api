import express from "express";
import { create,getAll,getbyID,update, remove} from "../controllers/brand.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

//* create Brands

 router.post("/", create);

 //* getAllBrands

 router.get("/",authenticate(), getAll);

 //* getBrandbyID

 router.get("/:id", getbyID);

 //* updateBrand

 router.put("/:id", update);

 //* removeBrand

 router.delete("/:id", remove);

 export default router;