import { NextFunction , Request, Response} from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { TokenExpiredError } from "jsonwebtoken";


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

    if(error instanceof JsonWebTokenError){
        message: "Invalid token. Login require";
        statusCode: 401;

    }
      if(error instanceof TokenExpiredError){
        message: "Token expired . Login require";
        statusCode: 401;

    }


    res.status(statusCode).json({
        message,
        success,
        status,
        data: null,
        details : error?.errors ?? null,
        originalError: error?.stack,
    //   originalError: process.env.NODE_ENV === "development" ? error?.stack : undefined,
    });

};
