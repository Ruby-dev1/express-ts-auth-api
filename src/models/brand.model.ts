// name ,  description , logo

import mongoose from "mongoose"

//* brand schema 

const brandSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true,"brand name is required"],
        minLength: [3,"name must be atleast 3 character long"],
        trim: true
    },
    description:{
        type: String,
        required:[true, "Description of the brand is required"],
        minLength: [10, "Description must be 10 character long"],
        trim: true,
    },
    logo:{
        type:String,
        required: [true, "logo is required"],
    },
    

},{timestamps:true});

//* brand model 

const Brand = mongoose.model("Brand",brandSchema);
export default Brand


