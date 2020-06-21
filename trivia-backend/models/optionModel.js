import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const OptionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
});
