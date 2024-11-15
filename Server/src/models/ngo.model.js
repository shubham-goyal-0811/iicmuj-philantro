import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ngoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Charitable Organizations",
      "Advocacy NGOs",
      "Social Welfare Organizations",
      "Environmental NGOs",
      "Educational NGOs",
      "Healthcare NGOs",
      "Cultural NGOs",
      "Microfinance NGOs",
      "Religious NGOs",
      "Research and Policy NGOs",
      "Disaster Relief NGOs",
      "Rural Development NGOs",
      "Youth and Sports NGOs",
      "Women Empowerment NGOs",
    ],
  },
  raise: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  contactNo: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  idProof: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Ngo = mongoose.model("Ngo", ngoSchema);
