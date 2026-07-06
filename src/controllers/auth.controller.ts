import { NextFunction ,Request, Response} from "express";
import User from "../models/user.model";
import {hashPassword,comparePassword} from "../utils/bcrypt.utils";
import appError from "../utils/appError.utils";
import {catchasync} from "../utils/catchasync.utils"

//* register

export const register = catchasync(async(
    req: Request,
    res:Response,
    next:NextFunction
)=>{
    
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

//         const hashPass = await hashPassword(password);

// const user = new User({ email, password: hashPass, full_name, phone });

// await user.save(); // now it saves the hashed version, only once

        //* handle profile_image upload

        //* success response 

        res.status(201).json({
            message: "Acount created",
            success: true,
            sataus: "success",
            data: user,
        });

    
   } )

//* login 


export const login = catchasync(async(req:Request, res: Response, next:NextFunction,)=>{
    
        const {email,password}= req.body;
        if(!email){
            throw new appError("email is required",400);
        }
        if(!password){
            throw new appError("password is required",400);
        }

        //* find user by email

        const user = await User.findOne({email:email}).select("+password");

        if(!user){
            throw new appError("credentials not  matched",400);
        }

        //* compare password
        const isPassMatched = await comparePassword(password, user.password);

        if(!isPassMatched){
            throw new appError("credentials not matched",400);
        }

        //todo: generate jwt token

        //* send success response

        res.status(201).json({
            message: "Login success",
            status: "success",
            success: true,
            data:user,
        });


   
})

//* get profile

//* change password 

//* forgot password 

//* change mail