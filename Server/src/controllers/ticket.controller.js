import { Ngo } from "../models/ngo.model.js";
import { Ticket } from "../models/raise.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const postTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (user.role !== "NGO") {
    throw new ApiError(401, "Unauthorized request to raise money");
  }

  const ngoId = req.params?.id;
  const ngo = await Ngo.findById(ngoId);
  if (!ngo) {
    throw new ApiError(404, "No NGO found with given ID");
  }

  const { amount, cause } = req.body;
  if (!amount || !cause) {
    throw new ApiError(400, "Amount and cause are mandatory");
  }
  const application = await Ticket.create({
    ngo: ngoId,
    amount,
    cause,
  });
  await ngo.raise.push(application._id);
  await ngo.save();

  if (!application) {
    throw new ApiError(
      500,
      "Something went wrong while registering a raise request"
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(201, application, "Ticket Raised successfully"));
});

export const getAllTicket = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = {
    $or: [
      { amount: { $regex: keyword, $options: "i" } },
      {
        cause: { $regex: keyword, $options: "i" },
      },
    ],
  };
  const donations = await Ticket.find(query)
    .populate({
      path: "ngo",
    })
    .sort({ createdAt: -1 });

  if (!donations) {
    throw new ApiError(404, "No NGO has raised a donation ticket");
  }

  return res.status(200).json(new ApiResponse(200, donations, "data fetched"));
});

export const getTicketbyNgo = asyncHandler(async (req, res) => {
  
  const ngoId = req.params?.id;
  const ngo = await Ngo.findById(ngoId);
  if (!ngo) {
    throw new ApiError(404, "No NGO found with given ID");
  }

  const tickets = await Ticket.find({ ngo: ngoId })
    .populate({ path: "ngo" })
    .sort({ createdAt: -1 });

  if (!tickets) {
    throw new ApiError(404, "No Ticket raised found by the specified ngo");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, tickets, "Tickets found succesfully"));
});

export const getTicketbyId = asyncHandler(async (req, res) => {
  const ticketId = req.params?.id;
  const tickets = await Ticket.findById(ticketId)
    .populate({ path: "ngo", model: "Ngo" })
    .populate({path : "donor"})
    .sort({ createdAt: -1 });

    if(!tickets){
        throw new ApiError(404,"No tickets found with the specified id");
    }
    return res.status(200).json(new ApiResponse(200,tickets,'Tickets found succesfully'));
});


export const updateTicket = asyncHandler (async(req,res)=>{
    const id = req.params?.id;
    if(!id){
        throw new ApiError(400,"id is not specified");
    }
    const {amount,cause} = req.body;
    if(!amount && !cause){
        throw new ApiError(400,"Please specify something to be changed")
    }
    const updatedData = {amount,cause};
    const ticket = await Ticket.findByIdAndUpdate(id,updatedData,{new : true});
    if(!ticket){
        throw new ApiError(500,"Something went wrong");
    }
    return res.status(200).json(new ApiResponse(200,ticket,"data updated succesfully"));
})
