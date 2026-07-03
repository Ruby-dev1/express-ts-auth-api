import { NextFunction ,Request, Response} from "express";
import User from "../models/user.model";
import {hashPassword} from "../utils/bcrypt.utils";


//* register

export const register = async(
    req: Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        //*body
        const{full_name, email, password, phone}= req.body;
        
        if(!full_name){
            const error: any = new Error("full_Name is required");
            error.statusCode = 400;
            error.status = "fail";
            throw error;
        }

        if(!email){
            const error:any = new Error("email is required");
            error.statusCode= 400;
            error.status = "fail";
            throw error;
        }
        if(!password){
            const error:any = new Error("password is required");
             error.statusCode= 400;
            error.status = "fail";
            throw error;

        }

        const user = new User ({email, password, full_name, phone});
        
        await user.save();

        //* hash password - find in site bcryptjs npm

        const hashPass =  await hashPassword(password);
        user.password = hashPass;

        //* handle profile_image upload

        //* success response 

        res.status(201).json({
            message: "Acount created",
            success: true,
            sataus: "success",
            data: user,
        });

    }
    catch(error){
        next(error);
    }

}

//* login 

//* get profile

//* change password 

//* forgot password 

//* change mail