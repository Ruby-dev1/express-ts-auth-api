import {Request, Response, NextFunction} from "express"
import User from "../models/user.model"
import appError from "../utils/appError.utils";
import { catchasync } from "../utils/catchasync.utils";
import {Role} from "../types/enum.types"


//* get all users

export const getAll = catchasync(async(req:Request, res:Response, next:NextFunction)=>{
    
        const users = await User.find({role:Role.USER});
        res.status(200).json({
            message:"ALL users fetched",
            status: "success",
            success: true,
            data:users,
        })

  
})


//*  get all admins
export const getAllAdmins = catchasync(async(req:Request, res:Response, next:NextFunction)=>{
    
        const users = await User.find({
            role:{
                $in:[Role.ADMIN, Role.SUPER_ADMIN]
            }
        })
        res.status(200).json({
            message:"ALL users fetched",
            success: "success",
            status: true,
            data:users,
        })
    

}
)

//* get user by id


export const getbyID = catchasync(async(req:Request, res:Response, next:NextFunction)=>{
    

        const {id} = req.params;
        const user = await User.findOne({_id:id});
        if(!user){
            throw new appError("user not found",404);
        }

        res.status(200).json({
            message: `user by id ${id} is feteched`,
            success: true,
            status : "success",
            data: user,
        })

    
   
});