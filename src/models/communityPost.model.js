import mongoose, { Schema } from 'mongoose'

const commentSchema= new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String,
        required:true
    },
}, {timestamps:true})
const communityPostSchema= new Schema(
    {
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
    comments:[commentSchema]
    },
    {timestamps:true}
)
export const CommunityPost= mongoose.model('CommunityPost', communityPostSchema)