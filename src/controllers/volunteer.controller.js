import { Volunteer } from "../models/volunteer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*-------------------
@desc     Add a new volunteer
@route    POST /api/v1/volunteers
@access   private
*/
const addVolunteer = asyncHandler(async (req, res) => {
    const { name, email, phone, image, location, availability } = req.body;
  
    // if (!name || !email || !phone || !image || !location || !availability) {
    //   throw new ApiError("All fields are required");
    // }
  
    const newVolunteer = await Volunteer.create({
      name,
      email,
      phone,
      image,
      location,
      availability,
    });
  
    if(!newVolunteer){
      console.log('volunteer', error)
    }
   res
    .status(201)
    .json(new ApiResponse(200, newVolunteer, "volunteer added succesfully"));
});
 
  
  /*-------------------
  @desc     Get all volunteers
  @route    GET /api/v1/volunteers
  @access   Public
  */
  const getAllVolunteers = asyncHandler(async (req, res) => {
    const volunteers = await Volunteer.find();
    
    res
    .status(200)
    .json(new ApiResponse(200, volunteers, "volunteers fetched succesfully"));
});
  export const volunteerControllers={
    addVolunteer,
    getAllVolunteers
  }