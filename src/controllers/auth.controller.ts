import { NextFunction ,Request, Response} from "express";
import User from "../models/user.model";
import {hashPassword} from "../utils/bcrypt.utils";
import appError from "../utils/appError.utils";


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
        //     const error: any = new Error("full_Name is required");
        //     error.statusCode = 400;
        //     error.status = "fail";
        //     throw error;
        // }
        throw new appError("full_name is required", 400)}

        if(!email){
           throw new appError("email is required", 400);
        }
        if(!password){
            throw new appError("password is required",400);

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