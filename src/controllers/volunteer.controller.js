import { Volunteer } from "../models/volunteer.model";
import { ApiError } from "../utils/ApiError";

/*-------------------
@desc     Add a new volunteer
@route    POST /api/v1/volunteers
@access   private
*/
const addVolunteer = asyncHandler(async (req, res) => {
    const { name, email, phone, image, location, availability } = req.body;
  
    if (!name || !email || !phone || !image || !location || !availability) {
      throw new ApiError("All fields are required");
    }
  
    const newVolunteer = await Volunteer.create({
      name,
      email,
      phone,
      image,
      location,
      availability,
    });
  
    res.status(201).json({
      success: true,
      data: newVolunteer,
    });
  });
  
  /*-------------------
  @desc     Get all volunteers
  @route    GET /api/v1/volunteers
  @access   Public
  */
  const getAllVolunteers = asyncHandler(async (req, res) => {
    const volunteers = await Volunteer.find();
    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  });

  export const volunteerControllers={
    addVolunteer,
    getAllVolunteers
  }