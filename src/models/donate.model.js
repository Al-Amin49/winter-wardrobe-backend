import mongoose, { Schema } from "mongoose";


const donateSchema= new Schema(
    {
        email:{
            type:String,
            required:true
        
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        clotheId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Clothe',
            required:true
        },
        quantity:{
            type: Number,
            required:true
        }


    },

{timestamps:true}
)
export const Donate= mongoose.model('Donate', donateSchema)