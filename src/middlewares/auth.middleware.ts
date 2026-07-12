

//* 1. login
//* 2. authorized ? 

import { NextFunction, Response ,Request} from "express";
import { Role } from "../types/enum.types";
import appError from "../utils/appError.utils";
import { verifyJwtToken } from "../utils/jwt.utils";
import ENV_CONFIG from "../config/env.config";
export const authenticate = (roles?:Role[])=>{

    return (req:Request, res:Response, next:NextFunction)=>{
        try{

            // Authorization header / cookies
            //* 1. get access_token

            const cookies = req.cookies;
            console.log(cookies);
            const access_token = cookies["access_token"];
            


            if(!access_token){
                throw new appError("unauthorized , login required.", 401);
            }

            //* 2. verify access token

            const decoded_data = verifyJwtToken(access_token);
            if(!decoded_data){
                throw new appError("Invalid token. Login required",401);
            }

            console.log(decoded_data);

            //* 3. check token expiry
            if(decoded_data.exp *1000<=Date.now()){

                //* clear cookie

                res.clearCookie("access_token",{
                     httpOnly: ENV_CONFIG.NODE_ENV=== "development"? false :true,
                                secure: ENV_CONFIG.NODE_ENV === "development"? false: true,
                                maxAge: 7*24*60*60*1000,
                                sameSite: ENV_CONFIG.NODE_ENV === "development"? "lax": true,
                });
                throw new appError("Token expired.Access denied", 401);
            }



            //* 4. check role

            if (roles && roles.length > 0 && !roles.includes(decoded_data.role)){
                throw new appError("Unauthorized. Access denied.", 403);
            }

            req.user = {
                _id:decoded_data._id,
                email:decoded_data.email,
                role:decoded_data.role,
            }

            next();

        }catch(error){
            next(error);
        }

    };

};
