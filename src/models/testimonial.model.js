import mongoose, { Schema } from 'mongoose';

const testimonialSchema = new Schema(
  {
    username:{
      type:String,
      required:true
      
  },
    location: {
      type: String
    },
    message: {
      type: String,
      required: true
    },
    profile:{
      type:String,
      default:"https://cdn-icons-png.freepik.com/256/1077/1077012.png?uid=R139182508&ga=GA1.1.1449054835.1702407798&"
    }

  },
  { timstamps: true }

)
export const Testimonial = mongoose.model('Testimonial', testimonialSchema)