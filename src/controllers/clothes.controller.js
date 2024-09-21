import { Clothe } from "../models/clothes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*-------------------
@desc     create a new clothe
@route    POST api/v1/clothes
@access  private
*/
const createClothe = asyncHandler(async (req, res) => {
  const { title, category, size, description, image } = req.body;

  //  const requiredFields = [title, category, description, image, size];
  //  const validSize = Array.isArray(size) && size.every((s) => typeof s === 'string' && s.trim() !== '');

  //  if (![...requiredFields, validSize].every(Boolean)) {
  //      throw new ApiError(400, 'All fields are required');
  //  }

  const newClothe = await Clothe.create({
    title,
    category,
    size,
    description,
    image,
  });

  res
    .status(201)
    .json(new ApiResponse(200, newClothe, "Clothe added Succesfully"));
});
/*-------------------
@desc     Get all clothes
@route    GET api/v1/clothes
@access   Public
*/
const getAllClothes = asyncHandler(async (req, res) => {
  // Get 'page' and 'limit' from the query string (with default values)
  const page = parseInt(req.query.page) || 1; // Default page 1
  const limit = parseInt(req.query.limit) || 6;

  // Calculate the number of items to skip based on the current page
  const skip = (page - 1) * limit;

  // Fetch the clothes with pagination (skip and limit)
  const allClothes = await Clothe.find().skip(skip).limit(limit);

  // Get the total count of clothes for pagination info
  const totalClothes = await Clothe.countDocuments();

  // Calculate total pages and whether there's a next page
  const totalPages = Math.ceil(totalClothes / limit);
  const hasNextPage = page < totalPages;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        clothes: allClothes,
        totalClothes, // Total number of items
        page, // Current page
        limit, // Items per page
        totalPages, // Total number of pages
        hasNextPage, // Whether there is a next page
      },
      "All clothes fetched successfully"
    )
  );
});

/*-------------------
@desc     Get a single clothe
@route    GET api/v1/clothes/:id
@access   Public
*/
const getSingleClothe = asyncHandler(async (req, res) => {
  const singleClothe = await Clothe.findById(req.params.id);

  if (!singleClothe) {
    throw new ApiError(404, "Clothe not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, singleClothe, "Single clothe fetched Succesfully")
    );
});
/*-------------------
@desc     Update a clothe
@route    PUT api/v1/clothes/:id
@access   Private
*/
const updateClothe = asyncHandler(async (req, res) => {
  const { title, category, size, description, image } = req.body;
  const id = req.params.id;

  // Find the record by ID and update it
  const updatedRecord = await Clothe.findByIdAndUpdate(
    id,
    { title, category, size, description, image },
    { new: true }
  );

  if (!updatedRecord) {
    throw new ApiError(404, "Clothe not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedRecord, "Updated clothe  Succesfully"));
});
/*-------------------
@desc     Delete a clothe
@route    DELETE api/v1/clothes/:id
@access   Private
*/
const deleteClothe = asyncHandler(async (req, res) => {
  const deleteClothe = await Clothe.findByIdAndDelete(req.params.id);
  if (!deleteClothe) {
    throw new ApiError(404, "Clothe not found");
  }
  res.status(200).json(new ApiResponse(200, {}, "clothe deleted Succesfully"));
});

export const clothesControllers = {
  createClothe,
  getAllClothes,
  getSingleClothe,
  updateClothe,
  deleteClothe,
};
