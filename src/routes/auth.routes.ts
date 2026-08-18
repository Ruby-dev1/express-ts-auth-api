import express from "express";
import {register,login, changeProfileImage,logout, getProfile} from "../controllers/auth.controller";
import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validator.middleware";
import { registerUserSchema } from "../validators/auth.validator";


const router = express.Router();

const upload = uploader();






//* register 
router.post('/register',upload.single("profile_image"),    validate(registerUserSchema),register);





//* login
router.post('/login',login);

//* change profile image
router.put(
    "/profile-image",
    upload.single("profile_image"),
    authenticate(),

    changeProfileImage,
)

//* logout 
router.post("/logout", logout)

//* get profile
router.get("/me", authenticate(), getProfile);

// router.post("/login", login);
export default router;
