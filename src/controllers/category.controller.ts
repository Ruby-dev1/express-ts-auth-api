
import { NextFunction,Request,Response } from "express";
import Category from "../models/category.model";
import { catchasync } from "../utils/catchasync.utils";
import appError from "../utils/appError.utils";


//* get all category 

export const getAll = catchasync(
    async(req:Request, res: Response, next: NextFunction)=>{
        const categories = await Category.find();

        res.status(200).json({
            message: "All categories are fetched",
            success: true,
            status: "success",
            count: categories.length,
            data: categories,
        });

    },

);


//* get by id 

export const getByID = catchasync(
    async (req: Request, res: Response, next: NextFunction)=>{

        const {id} = req.params;
        const category = await Category.findById(id);

        if(!category){
            
        }
    }
)


