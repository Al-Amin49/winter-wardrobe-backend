import mongoose, { Schema } from "mongoose";

const clothSchema= new Schema(
{
    title:{
        type:String,
        required:[true, 'Title is required'],
        trim:true
    },
    category:{
        type:String,
        required:[true, 'Category is required'],
        trim:true
    },
    size:{
        type:[String],
        required:[true, 'Size is required'],
        trim:true
    },
    description:{
        type:String,
        required:[true, 'Size is required'],
        trim:true
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
      },
      giveaway: [
        {
          img: {
            type: String,
          },
          location: {
            type: String,
            trim: true
          },
          additionalInfo: {
            type: String,
            trim: true
          }
        }
      ]

},{
    timestamps:true
})

export const Clothe=mongoose.model('Clothe', clothSchema)