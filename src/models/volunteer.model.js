

const volunteerSchema = new mongoose.Schema({
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
    location: {
      type: String,
      required: true
    },
    availability: {
      weekdays: Boolean,
      weekends: Boolean,
      evenings: Boolean
    }, 

  },{timestamps:true});
  

  export const Volunteer = mongoose.model('Volunteer', volunteerSchema);