import { Ngo } from "../models/ngo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import { User } from "../models/user.model.js";

const registerNgo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (user.role !== "NGO") {
    throw new ApiError(401, "Unauthorized");
  }
  const { name, email, description, address, category, contactNo } = req.body;

  if (!name || !email || !description || !address || !category || !contactNo) {
    throw new ApiError(400, "All Fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const pattern = /^[7-9]\d{9}$/;
  if (!pattern.test(contactNo)) {
    throw new ApiError(400, "Please enter a valid mobile number");
  }

  const ngoExist = await Ngo.findOne({
    $or: [{ email }, { name }],
  });

  if (ngoExist) {
    throw new ApiError(400, "NGO with same name or email already exists");
  }

  const idProofPath = req.files?.idProof[0].path;
  let logoPath;
  if (req.files && Array.isArray(req.files.logo) && req.files.logo.length > 0) {
    logoPath = req.files.logo[0].path;
  }

  if (!idProofPath) {
    throw new ApiError(400, "NGO Proof is required");
  }

  const idProof = await uploadOnCloudinary(idProofPath);
  const logo = await uploadOnCloudinary(logoPath);

  if (!idProof) {
    throw new ApiError(
      500,
      "Something went wrong while uploading NGO proof on cloudinary"
    );
  }

  const ngo = await Ngo.create({
    name,
    email,
    description,
    address,
    category,
    contactNo,
    idProof: idProof.url,
    logo: logo?.url || "",
    createdBy: req.user._id,
  });

  const ngoCreated = await Ngo.findById(ngo._id).select(" -refreshToken");
  if (!ngoCreated) {
    throw new ApiError(500, "Something went wrong");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, ngoCreated, "Ngo Listed Successfully"));
});

const getAllNgo = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      {
        description: { $regex: keyword, $options: "i" },
      },
    ],
  };

  const ngos = await Ngo.find(query)
    .populate({ path: "createdBy", model: "User" })
    .sort({ createdAt: -1 })
    .select(" -donors -createdBy -idProof");
  //populate to be added later
  if (!ngos) {
    throw new ApiError(404, "No Ngos found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, ngos, "NGOs Fetched succesfully"));
});

const getNgobyId = asyncHandler(async (req, res) => {
  const ngoId = req.params?.id;
  if (!ngoId) {
    throw new ApiError(400, "Please enter the NGO to be searched");
  }
  const ngo = await Ngo.findById(ngoId)
    .populate({ path: "createdBy", model: "User" })
    .sort({ createdAt: -1 })
    .select(" -donors -createdBy -idProof"); //populate to tbe added later
  if (!ngo) {
    throw new ApiError(404, "No Ngo found with the given criteria");
  }
  return res.status(200).json(new ApiResponse(200, ngo, "Ngo found"));
});

const getNgobyAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (user.role !== "NGO") {
    throw new ApiError(401, "Unauthorized request");
  }
  const ngos = await Ngo.find({ createdBy: user._id });
  if (!ngos) {
    throw new ApiError(404, "No NGO found listed by you");
  }
  return res.status(200).json(new ApiResponse(200, ngos, "Successfully found"));
});

const updateNgo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  
  const id = req.params?.id;
  if (!id) {
    throw new ApiError(400, "No NGO ID found");
  }
  if(!user){
    throw new ApiError(401,"User not found");
  }
  if (user.role !== "NGO") {
    throw new ApiError(401, "Unauthorized");
  }
  const { description, address, category, contactNo } = req.body;
  const logoPath = req.files?.logo[0].path;
  if (
    !description &&
    !address &&
    !category &&
    !contactNo &&
    !logoPath
  ) {
    throw new ApiError(400, "Add something to change");
  }

  const logo = await uploadOnCloudinary(logoPath);
  if (!logo) {
    throw new ApiError(500, "Something went wrong while updating the logo");
  }

  
  const ngo = await Ngo.findById(id);
  if (!ngo) {
    throw new ApiError(500, "Something went wrong while updtaing the ngo");
  }
  if(description){
    ngo.description = description;
  }
  if(address){
    ngo.address = address;
  }
  // if(category){
  //   ngo.category = category;
  // }
  if(contactNo){
    ngo.contactNo = contactNo;
  }
  if(logoPath){
    ngo.logo = logo.url;
  }
  await ngo.save();
  
  return res.status(200).json(new ApiResponse(200, ngo, "Updation succesfull"));
});

export { registerNgo, getAllNgo, getNgobyId, getNgobyAdmin, updateNgo };
