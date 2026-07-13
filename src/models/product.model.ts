import  mongoose,{ Schema, Document } from "mongoose";
import ImageSchema from "./image.model";
import { IImage } from "../types/global.types";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  cover_image: IImage;
  images: IImage[];
  category: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId;
  is_featured: Boolean;
  //tags:
}
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "product name  is required"],
    trim: true,
    unique: true,
    minLength: 3,
    maxLength: 10,
  },
 price:{
    type: Number,
    required: [true, "price is required"],
    trim: true,


  },

description: {
    type: String,
    required: [true, "description is require"],
    trim: true,
    minLength: 10,
    maxLength: 500,
  },


cover_image: {
    type:ImageSchema,
    required: [true, "cover image is required"],
},

category:{
    type:mongoose.Schema.Types.ObjectId,
    required: [true, "category is required"],
    ref: "category",

},

brand:{
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Brand is required"],
    ref: "Brand"
},
images: [
    {
    type:ImageSchema,
    default: null,
}
],

is_featured: {
    type: Boolean,
    default: false,

},
//tags:{}


},{timestamps:true},);


const Product = mongoose.model<IProduct>("product", productSchema)
export default Product;