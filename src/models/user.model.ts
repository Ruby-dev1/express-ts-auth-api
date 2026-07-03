
import mongoose from "mongoose"
//* user schema
const userSchema = new mongoose.Schema({
    full_name:{
        type: String,
        required: [true, "full_name is required"],
        minLength : [3, "name must be atleast 3 character long"],
        triim: true,
    },
    email:{
        type:String,
        required: [true, "email is required"],
        unique: [true, "user already exists with provided with email"],
        trim: true,
    },
    password:{
        type:String,
        required: [true,"password is required"],

    },
 profile_image: {
        type:String,

    },

role:{
        type: String,
        enum: ["USER", "ADMIN", "SUPER ADMIN"]   ,
        default: "USER",     

    },
phone:{
         type:String,
         required: false,
         maxLength: [10,"phone number atmost be 10 digits long"],

    }
}, {timestamps: true});

//* user model 
const User = mongoose.model("user", userSchema);
export  default User;