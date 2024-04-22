import mongoose from "mongoose";
import { Schema } from "mongoose";


const volunteerSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    image:{
        type:String,
        required:true
    },
    location: {
      type: String,
      required: true
    },
    approve:{
        type:Boolean,
        default:false
    },
    availability: {
      weekdays: Boolean,
      weekends: Boolean,
      evenings: Boolean
    }, 

  },{timestamps:true});
  

  export const Volunteer = mongoose.model('Volunteer', volunteerSchema);