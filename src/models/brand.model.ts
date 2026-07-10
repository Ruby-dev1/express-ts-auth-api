// name ,  description , logo
import mongoose, { Schema, Document } from "mongoose";
import ImageSchema from "./image.model";
import { IImage } from "../types/global.types";
//* Interface

export interface IBrand extends Document {
  name: string;
  description?: string;
  logo: IImage;
}

//* brand schema

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: true,
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      minLength: 25,
      maxLength: 500,
    },
    logo: {
      type: ImageSchema,
      default : null,
    },
  },
  { timestamps: true },
);

//* brand model

const Brand = mongoose.model<IBrand>("Brand", brandSchema);
export default Brand;
