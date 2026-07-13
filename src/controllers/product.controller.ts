import { Request,Response,NextFunction } from "express";
import Product from "../models/product.model";
import appError from "../utils/appError.utils";
import { catchasync } from "../utils/catchasync.utils";
import { sendResponse } from "../utils/sendresponse.utils";


//* create Product

export const create = catchasync(async(req:Request,res:Response,next:NextFunction)=>{

    const {name, description,price} = req.body;
    if(!name) throw new appError("name is required",400);
    if(!description)throw new appError("description is required",400);
    if(!price) throw new appError("price is required",400);

    const existingProduct = await Product.findOne({name});
    if(existingProduct) throw new appError("name is already exist",400)
        const product = await Product.create ({
    name,
description,
        });

sendResponse(res,{
    message: "Product is created",
    statusCode: 201,
    data:product,


})
});

//* get all products

export const getAll= catchasync(async(req:Request, res:Response, next:NextFunction)=>{

    const products = await Product.find();
    sendResponse(res,{
        message: "Product is fetched",
        statusCode:200,
        data:products,
    })
})


//* get all products by id

export const getByID = catchasync(async(req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) throw new appError("product not found",404);

    sendResponse(res,{
        message: `product by id ${id} is fetched`,
        statusCode:200,
        data: product,
    })
})


//* update product

export const update = catchasync(async(req:Request, res: Response, next:NextFunction)=>{
    const {id} = req.params;
    const existingProduct = await Product.findById(id);
    if(!existingProduct) throw new appError("product does not exist",404);

    const {name, description, price} = req.body;
    const updateProduct = await Product. findByIdAndUpdate({ _id:id},
        {name,description,price},
        {new: true},
    )
         sendResponse(res,{
    message: "Product is updated",
    statusCode: 201,
    data:updateProduct,


})
});




//* delete

export const remove = catchasync(
    async(req:Request, res: Response, next: NextFunction)=>{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete({_id:id})
        if(!product) throw new appError("product not found", 404);

     sendResponse(res,{
    message: "Product is created",
    statusCode: 201,
    data:product,


})
    },
);