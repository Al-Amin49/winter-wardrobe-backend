import mongoose from mongoose

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
const communitySchema= new Schema(
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
    comments:[commentSchema]
    },
    {timestamps:true}
)
export const Community= mongoose.model('Community', communitySchema)