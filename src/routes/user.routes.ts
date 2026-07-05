import express from "express"
import { getAll, getAllAdmins, getbyID } from "../controllers/user.controller";

const router = express.Router();

//* get all users
router.get('/',getAll)

//* get all admins

router.get("/admins", getAllAdmins)

//* get by id
router.get("/:id", getbyID)




export default router;