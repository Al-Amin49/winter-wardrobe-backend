import { Testimonial } from "../models/testimonial.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/***
@desc     create testimonial
@route    POST api/v1/testimonial/
@access  private
 */

const postTestimonial = asyncHandler(async (req, res) => {
  const { username, message, location, rating } = req.body;

  //validate the input
  // if (!username ||  !message || !location || !rating === undefined) {
  //   throw new ApiError(400, "All fields are required");
  // }
  //ensure the rating range is within the allowed range
  if (rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  const newTestimonail = await Testimonial.create({
    username,
    message,
    location,
    rating,
  });
  res
    .status(201)
    .json(
      new ApiResponse(200, newTestimonail, "Testimonial added successfully")
    );
});
/**
 * @desc    Get all testimonials
 * @route   GET /api/v1/testimonials/
 * @access  Public
 */
const getAllTestimonials = asyncHandler(async (_, res) => {

  const testimonials = await Testimonial.find()
  if (!testimonials) {
    throw new ApiError(404, "Testimonials not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
        testimonials,
      "Testimonials fetched successfully"
    )
  );
});

export { postTestimonial, getAllTestimonials };
