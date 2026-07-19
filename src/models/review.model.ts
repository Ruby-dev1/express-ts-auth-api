import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {

        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
            unique: true
        },

        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
        },
        rating:{
            type: Number,
            default: 0,
        },
        text: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 500,
        },
    },
    
    
    
    
    
    {timestamps:true});


    const Review = mongoose.model("review", reviewSchema);
    export default Review;