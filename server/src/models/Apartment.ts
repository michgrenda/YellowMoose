import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  priceCurrency: {
    type: Number,
  },
  floor: {
    type: Number,
    required: true,
  },
  numberOfFloors: {
    type: Number,
    required: true,
  },
});

export const Apartment = mongoose.model("Apartment", apartmentSchema);
