import mongoose from "mongoose";
import {Role} from "../types/enum.types"

export interface IImage{
    path: string;
    public_id: string;
}

export interface IJwtpayload{
    _id: mongoose.Types.ObjectId;
    email: string;
    role: Role;
}