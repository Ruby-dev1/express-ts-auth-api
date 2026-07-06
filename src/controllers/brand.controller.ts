import {Request, Response, NextFunction,} from "express";
import Brand from "../models/brand.model";
import appError from "../utils/appError.utils";
import { catchasync } from "../utils/catchasync.utils";


//* create Brands

export const create = catchasync(async(req:Request, res:Response, next:NextFunction)=>{
    

        const {name, description} = req.body;
            if (!name ) throw new appError("names are required", 400);
            if(!description) throw new appError("description are required",400);
    
    

        const brand = await Brand.create({
            name,
            description,
            
        });

        res.status(201).json({
            message: "Brand is created successfully",
            success: true,
            status: "success",
            data:brand,

        })


//    await Brand.save();

}
)





//* get all brands

export const getAll = catchasync(async(req:Request, res:Response, next:NextFunction)=>{

        
        const brands = await Brand.find();
        res.status(200).json({
            message:" Brand is fetched",
            success: true,
            status: "success",
            data: brands,
        })
    }
   
)


//* get brands by ID

export const getbyID = catchasync(async(req:Request, res:Response, next:NextFunction)=>{


    const {id} = req.params
    const brand = await Brand.findById(id);
    if(!brand){
        return new appError("Brand not found",404)
    }

    res.status(200).json({
        message:`Brand by is ${id} is fetched`,
        success: true,
        status:"success",
        data: brand,

    })



})

//* update brand 

export const update = catchasync(async(req:Request, res:Response, next:NextFunction)=>{
    

        const {id} = req.params;

        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!updateBrand){
        throw new appError("Brand not found",404);
    }

    res.status(200).json({
        message: "Brand updated successfully",
        success: true,
        status: "success",
        data: updateBrand,

    });
    
})

//* Delete Brand

export const remove = catchasync(async(req:Request, res: Response, next: NextFunction)=>{
    
        const {id} = req.params;
        const removeBrand = await Brand.findByIdAndDelete(id);

        if(!removeBrand){
            throw new appError("Brand not found",404);
        }

        res.status(200).json({
            message:"Brand is deleted successfully",
            success: true,
            status:"success",
            data:removeBrand,
        });


    
    }

)