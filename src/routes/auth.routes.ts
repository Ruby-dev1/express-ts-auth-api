import express from "express";
import {register,login, changeProfileImage} from "../controllers/auth.controller";
import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";


const router = express.Router();

const upload = uploader();






//* register 
router.post('/register',upload.single("profile_image"),register);





//* login
router.post('/login',login);

//* chnage profile image
router.put(
    "/profile-image",
    upload.single("profile_image"),
    authenticate(),
    changeProfileImage,
)

//* logout 
//router.post("/logout", logout)

//* get profile
//router.get("/me", profile)

// router.post("/login", login);
export default router;
