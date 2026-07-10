import {Request, Response, NextFunction,} from "express";
import Brand from "../models/brand.model";
import appError from "../utils/appError.utils";
import { catchasync } from "../utils/catchasync.utils";
import {upload} from "../utils/cloudinary.utils";


const uploadFolder = "/brands";


//* create Brands

export const create = catchasync(async(req:Request, res:Response, next:NextFunction)=>{
    

        const {name, description} = req.body;
        const file = req.file;
        console.log(file);
            if (!name ) throw new appError("names are required", 400);
            if(!file) throw new appError("logo is  required",400);
    
        const existingBrand = await Brand.findOne({name});
        if(existingBrand) throw new appError("name is already exists",404);

        const brand = await Brand.create({
            name,
            description,
            
        });

         // * handle logo upload
  //* upload to cloudinary
  const { path, public_id } = await upload(file, uploadFolder);

  //profile_image = {path:'',public_id:''}
  // profile_image = ''

  brand.logo = {
    path,
    public_id,
  };

        res.status(201).json({
            message: "Brand is created successfully",
            success: true,
            status: "success",
            data:brand,

        })

    })




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