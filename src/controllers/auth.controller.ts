import { NextFunction,Request, Response} from "express";
import User from "../models/user.model";
import {hashPassword,comparePassword} from "../utils/bcrypt.utils";
import appError from "../utils/appError.utils";
import {catchasync} from "../utils/catchasync.utils"
import { deleteFile,uploadToCloudinary } from "../utils/cloudinary.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import { IJwtpayload } from "../types/global.types";
import ENV_CONFIG from "../config/env.config";
import { sendResponse } from "../utils/sendresponse.utils";
import { sendEmail } from "../utils/emailservice.utils";
import { newLoginDetectedHtml,accountCreatedHtml } from "../utils/emailTemplates.utils";

const uploadFolder = "/profile_images";

//* register

export const register = catchasync(async(
    req: Request,
    res:Response,
    next:NextFunction
)=>{
    
        //*body
        const{full_name, email, password, phone}= req.body;
        const file = req.file
        console.log(file);
        
        // if(!full_name){
        // //     const error: any = new Error("full_Name is required");
        // //     error.statusCode = 400;
        // //     error.status = "fail";
        // //     throw error;
        // // }
        // throw new appError("full_name is required", 400)}

        // if(!email){
        //    throw new appError("email is required", 400);
        // }
        // if(!password){
        //     throw new appError("password is required",400);

        // }

        const user = new User ({email, password, full_name, phone});
        
       

        //* hash password - find in site bcryptjs npm

        const hashPass =  await hashPassword(password);
        user.password = hashPass;

//         const hashPass = await hashPassword(password);

// const user = new User({ email, password: hashPass, full_name, phone });

// await user.save(); // now it saves the hashed version, only once

        //* handle profile_image upload

        if(file){
            //* upload to cloudinary
          const {path, public_id}  = await uploadToCloudinary(file,uploadFolder);

          user.profile_image = {
            path,
            public_id,
          }
        }

        //! save user
            await user.save();
            

            sendEmail({
                to: user.email,
                subject: "Account created",
                html: accountCreatedHtml({
                    full_name: user.full_name,
                    email: user.email,
                    createdAt: user.createdAt,
                })
            })

            //* converting mongoose doc to js object
 const {password:user_pass,...rest} = user.toObject()
        //* success response 

       
     sendResponse(res,{
        message: "Account created ",
        statusCode: 201,
        data: rest,
        
     });

    
   } )

//* login 


export const login = catchasync(async(req:Request, res: Response, next:NextFunction,)=>{
    
        const {email,password}= req.body;
        // if(!email){
        //     throw new appError("email is required",400);
        // }
        // if(!password){
        //     throw new appError("password is required",400);
        // }

        // //* find user by email

        const user = await User.findOne({email:email}).select("+password");

        if(!user){
            throw new appError("credentials not  matched",400);
        }

        //* compare password
        const isPassMatched = await comparePassword(password, user.password);

        if(!isPassMatched){
            throw new appError("credentials not matched",400);
        }


        sendEmail({
            to:user.email,
            subject: "login Detected",
            html: newLoginDetectedHtml({
                full_name: user.full_name,
                email: user.email,
                loginTime: new Date(Date.now()),
                device:req.headers["user-agent"]!!,
            }),

        })
        //todo: generate jwt token
        const payload:IJwtpayload={
            _id:user._id,
            email:user.email,
            role:user.role,

        }

        const access_token = generateJwtToken(payload)

        res.cookie("access_token", access_token,{
            httpOnly: ENV_CONFIG.NODE_ENV=== "development"? false :true,
            secure: ENV_CONFIG.NODE_ENV === "development"? false: true,
            maxAge: 7*24*60*60*1000,
            sameSite: ENV_CONFIG.NODE_ENV === "development"? "lax": true,
        })


        const {password: p, ...rest}= user.toObject();
        //* send success response

     sendResponse(res,{
        message: "Login success",
        statusCode: 201,
        data:{
            user:rest,
            access_token,
        }
     })


   
})


//* logout
export const logout = catchasync(async(req:Request,res:Response)=>{
    res.clearCookie("access_token",{
        
            httpOnly: ENV_CONFIG.NODE_ENV=== "development"? false :true,
            secure: ENV_CONFIG.NODE_ENV === "development"? false: true,
            maxAge: 7*24*60*60*1000,
            sameSite: ENV_CONFIG.NODE_ENV === "development"? "lax": true,
    });

    sendResponse(res,{
        message:"Logout Success",
        statusCode:200,
        data:null
    })
})

//* get Profile

export const getProfile = catchasync(async (req: Request, res: Response) => {

     const userId = req.user._id;

    const user = await User.findById(userId);
    if(!user){
         res.clearCookie("access_token",{
        
            httpOnly: ENV_CONFIG.NODE_ENV=== "development"? false :true,
            secure: ENV_CONFIG.NODE_ENV === "development"? false: true,
            maxAge: 7*24*60*60*1000,
            sameSite: ENV_CONFIG.NODE_ENV === "development"? "lax": true,
    });
    throw new appError("profile not found",400)
    }
    sendResponse(res, {
        message: "Profile fetched",
        statusCode: 200,
        data: user,
    });
});









//* change profile image

export const changeProfileImage = catchasync(
    async(req:Request,res:Response)=>{
       const{_id}= req.user ;
       const file = req.file;
       if(!file){
        throw new appError("profile image is required", 400);
       }
       const user = await User.findOne({_id:_id});
       if(!user){
        throw new appError("profile not found", 400);
       }
//! delete old image

if(user.profile_image&& user.profile_image?.public_id){
       await deleteFile(user.profile_image?.public_id);
    } 

       const {path, public_id} = await uploadToCloudinary (file, uploadFolder);
       user.profile_image={
        path,
        public_id,
       };

       await user.save();
//* send success response

sendResponse(res,{
    message: "profile updated",
    statusCode: 200,
    data: user,
});

})


//* change password

export const changePassword = catchasync(
    async (req: Request, res: Response) => {

        const { _id } = req.user;
        const { old_password, new_password } = req.body;

        //* find logged-in user
        const user = await User.findById(_id).select("+password");

        if (!user) {
            throw new appError("User not found", 404);
        }

        //* check old password
        const isPasswordMatched = await comparePassword(
            old_password,
            user.password
        );

        if (!isPasswordMatched) {
            throw new appError("Old password is incorrect", 400);
        }

        //* hash new password
        const hashedPassword = await hashPassword(new_password);

        //* update password
        user.password = hashedPassword;

        await user.save();

        //* success response
        sendResponse(res, {
            message: "Password changed successfully",
            statusCode: 200,
            data: null,
        });
    }
);
//* forgot password

export const forgotPassword = catchasync(
    async (req: Request, res: Response) => {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new appError("User not found", 404);
        }

        //* generate reset token
        const resetToken = generateJwtToken({
            _id: user._id,
            email: user.email,
            role: user.role,
        });

const resetLink =
    `${ENV_CONFIG.FRONT_END_URL}/reset-password/${resetToken}`;

        await sendEmail({
            to: user.email,
            subject: "Reset your password",
            html: `
                <h2>Password Reset</h2>

                <p>Hello ${user.full_name},</p>

                <p>You requested to reset your password.</p>

                <p>
                    Click the link below to reset your password:
                </p>

                <a href="${resetLink}">
                    Reset Password
                </a>

                <p>This link will allow you to create a new password.</p>
            `,
        });

        sendResponse(res, {
            message: "Password reset link sent to your email",
            statusCode: 200,
            data: null,
        });
    }
);



//* change email

export const changeEmail = catchasync(
    async (req: Request, res: Response) => {

        const { _id } = req.user;
        const { password, new_email } = req.body;

        const user = await User.findById(_id).select("+password");

        if (!user) {
            throw new appError("User not found", 404);
        }

        //* check password
        const isPasswordMatched = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            throw new appError("Password is incorrect", 400);
        }

        //* check if email already exists
        const existingUser = await User.findOne({
            email: new_email,
            _id: { $ne: _id },
        });

        if (existingUser) {
            throw new appError("Email already exists", 400);
        }

        //* update email
        user.email = new_email;

        await user.save();

        sendResponse(res, {
            message: "Email changed successfully",
            statusCode: 200,
            data: {
                email: user.email,
            },
        });
    }
);