import { Testimonial } from "../models/testimonial.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/***
@desc     Create testimonial
@route    POST api/v1/testimonial/
@access   Private
*/
const postTestimonial = asyncHandler(async (req, res) => {
  const testimonialData =req.body;

  // Validate request body
  // if (!userId || !clotheId || !quantity) {
  //   throw new ApiError("All fields are required", 400);
  // }

  const newTestimonial = await Testimonial.create(testimonialData);

  res
    .status(201)
    .json(new ApiResponse(200, newTestimonial, "Testimonial added successfully"));
});


/**
 * @desc    Get all testimonials
 * @route   GET /api/v1/testimonials/
 * @access  Public
 */
const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find();

  if (!testimonials.length) {
    throw new ApiError(404, "No testimonials found");
  }

  res.status(200).json(
    new ApiResponse(200, testimonials, "Testimonials fetched successfully")
  );
});

export { postTestimonial, getAllTestimonials };
