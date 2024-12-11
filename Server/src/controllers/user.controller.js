import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import tesseract from 'node-tesseract-ocr';

const performOCR = async (filePath) => {
    const config = {
        lang: 'eng', // Language configuration
        oem: 1, // OCR Engine Mode (1 = LSTM only)
        psm: 3, // Page Segmentation Mode (3 = Fully automatic page segmentation)
    };

    try {
        console.log("Starting OCR process...");
        const text = await tesseract.recognize(filePath, config);
        console.log("OCR process completed successfully");
        // console.log(text);
        return text;
    } catch (error) {
        console.error("Tesseract OCR Error:", error.message);
        throw new ApiError(500, "Failed to perform OCR on the provided document.");

    }
};

const generateAccessandRfreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken(); // Corrected
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }; // Corrected
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong while generating access and refresh token");
    }
};




const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, confirmpassword, password, mobileNo, role } = req.body;
    if (
        [fullName, email, username, password, confirmpassword, role].some((field) => {
            field?.trim() === ""
        })
        // we can use map too
    ) {
        throw new ApiError(400, "All Fields are required");
    }

    if (confirmpassword !== password) {
        throw new ApiError(400, "Password and confirm password should match");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    const pattern = /^[7-9]\d{9}$/;
    if (!pattern.test(mobileNo)) {
        throw new ApiError(400, "Please enter a valid mobile number");
    }

    const idProofLocalPath = req.files?.idProof[0].path;
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    if (!idProofLocalPath) {
        throw new ApiError(400, "ID Proof document is required");
    }

    const existUser = await User.findOne({
        $or: [{ username }, { email }, { mobileNo }]
    });
    if (existUser) {
        fs.unlinkSync(idProofLocalPath);
        if (avatarLocalPath) fs.unlinkSync(avatarLocalPath);
        throw new ApiError(409, "User with this email or Username or Mobile Number already exists");
    }

    let extractedText;
    try {
        extractedText = await performOCR(idProofLocalPath);
    } catch (err) {
        fs.unlinkSync(idProofLocalPath); // Clean up file if OCR fails
        throw new ApiError(500, "OCR failed on the ID proof");
    }

    const containsAadhaar = /aadhaar/i.test(extractedText);
    const containsGovernmentOfIndia = /government of india/i.test(extractedText);
    if (!containsAadhaar && !containsGovernmentOfIndia) {
        fs.unlinkSync(idProofLocalPath);
        if (avatarLocalPath) fs.unlinkSync(avatarLocalPath);
        // res.status(400).json({
        //     message :"Invalid or Blurry ID Proof"
        // });
        // return;
        throw new ApiError(400, "Invalid or Blurry ID proof");
    }

    // Extract Aadhaar Number and Name
    // const aadhaarNumberRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
    // const aadhaarNumber = extractedText.match(aadhaarNumberRegex)?.[0];
    // const extractedName = extractedText.split("\n").find(line => line.trim() && !aadhaarNumberRegex.test(line));

    // if (!aadhaarNumber || !extractedName) {
    //     

    // }

    // console.log("Aadhaar Number:", aadhaarNumber);
    // console.log("Extracted Name:", extractedName);

    // console.log("goiing in cloudinary");
    const idProof = await uploadOnCloudinary(idProofLocalPath);
    // console.log("id proof++")
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    // console.log("avatar++");

    if (!idProof) {
        throw new ApiError(500, "Something went wrong while Uploading the idProof");
    }

    const user = await User.create({
        fullName,
        idProof: idProof.url,
        avatar: avatar?.url || "",
        email,
        password,
        username: username.toLowerCase(),
        mobileNo,
        role,
        donation: []
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong while registring the user");
    }

    console.log("registration done");
    return res.status(201).json(
        new ApiResponse(201, userCreated, "user Created succesfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, mobileNo, password } = req.body;

    if (!username && !email && !mobileNo) {
        throw new ApiError(400, "Kindly Fill Atleast one of the given fields");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }, { mobileNo }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPassValid = await user.isPasswordCorrect(password);
    if (!isPassValid) {
        throw new ApiError(401, "Invalid Password");
    }

    // if(role !== user.role){
    //     throw new ApiError(401,"No User found ");
    // }

    const { accessToken, refreshToken } = await generateAccessandRfreshToken(user._id);
    user.refreshToken = refreshToken;
    const loggedInUser = await User.findById(user._id).populate("donation").select("-password -refreshToken");

    /*
    


    */

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options) // Corrected
        .cookie("refreshToken", refreshToken, options)
        .cookie("avatar", user.avatar, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken, // Corrected
                    refreshToken,
                },
                "User Logged In Successfully"
            )
        );
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRequestToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRequestToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRequestToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRequestToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        }



        const { accessToken, newRefreshToken } = await generateAccessandRfreshToken(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options) // Corrected
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken, // Corrected
                        refreshToken: newRefreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );

    } catch (error) {
        console.error("Error verifying token:", error);
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id);
    const isPassCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPassCorrect) {
        throw new ApiError(400, "Invalid Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, {}, "Password Updation Successfull")
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
        .populate({
            path: "donation",
            populate: {
                path: "ngoId", // Populate ngoId field from Donation
                select: "name", // Include only the NGO name
            },
        })
        .select("-password -refreshToken"); // Exclude sensitive fields

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, fullName, email, mobileNo } = req.body;

    if (!username || !email || !mobileNo || !fullName) {
        throw new ApiError(400, "At least one field is mandatory to update");
    }
    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                fullName,
                username,
                email,
                mobileNo
            }
        }, { new: true }// with this The method returns the document after the update has been applied. This is useful when you want to immediately work with the updated document.
    ).select("-password -refreshToken")


    return res.status(200).json(new ApiResponse(200, user, "Account Updated succesfully"));
})
const changeIdproof = asyncHandler(async (req, res) => {
    const proofLocalPath = req.file?.path;
    if (!proofLocalPath) {
        throw new ApiError(400, "Please upload the new Proof");
    }
    const proof = await uploadOnCloudinary(proofLocalPath);
    if (!proof.url) {
        throw new ApiError(500, "Something went wrong while updating the proof");
    }
    await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                idProof: proof.url
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, proof, "IDProof Updated successfully"))
})

const changeAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error in uploading image on cloudinary");
    }

    await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, avatar, "Avatar updated succesfully"));
})

// Assuming you have a User model
export const calculateTotalDonations = async (req, res) => {
    try {
        // The user is verified using your JWT middleware
        const userId = req.user.id; // Assuming the middleware adds `req.user`

        // Fetch the user and their donations from the database
        const user = await User.findById(userId).populate("donation", "amount");

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Calculate the total amount from the donations array
        const totalDonations = user.donations.reduce((total, donation) => {
            return total + (donation.amount || 0);
        }, 0);

        // Send the total donations back to the client
        res.status(200).json({ totalDonations });
    } catch (error) {
        console.error('Error calculating total donations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    changeIdproof,
    changeAvatar
}