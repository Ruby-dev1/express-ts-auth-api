import { NextFunction , Request, Response} from "express";


export const errorHandler = (error:any, req:Request, res:Response, next:NextFunction)=>{
    console.log(error);
    const message = error?.message?? "Internal server error";
    let status = error?.status?? "error";
    let  statusCode = error?.statusCode ?? 500;
    const success = false;

    console.log(error?.cause?.code);

    if(error?.cause?.code ===11000){
        statusCode = 400;
        status ="fail"
    }
    res.status(statusCode).json({
        message,
        success,
        status,
        data: null,
        originalError: error?.stack,
    //   originalError: process.env.NODE_ENV === "development" ? error?.stack : undefined,
    });

};
