import mongoose, { Schema, Document } from "mongoose";

//* Interface
export interface ICategory extends Document {
    name:string;
    description?:string;
    logo:{
        path:string;
        public_id:string;
    };
}

//* category schema

const categorySchema = new Schema<ICategory>(
    {
  name: {
    type: String,
    required: [true, "category name is required"],
    trim: true,
    unique: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    trim: true,
    minLength: 25,
    maxLength: 100,
  },
logo:{
    path:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    }
},
},

{
    timestamps: true,
},

);

//* Category Model
const Category = mongoose.model<ICategory>("Category", categorySchema)

export default Category;
