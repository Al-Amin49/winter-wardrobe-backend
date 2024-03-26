import mongoose, { Schema } from 'mongoose';

const testimonialSchema = new Schema(
    {
       username:{
        type:String,
        required:true
       },
          location:{
            type:String
          },
          message: {
            type: String,
            required: true
          },
          rating: {
            type: Number, 
            min: 1, 
            max: 5, 
            required: true
          },

},
{timstamps:true}

)
export const Testimonial= mongoose.model('Testimonial', testimonialSchema)