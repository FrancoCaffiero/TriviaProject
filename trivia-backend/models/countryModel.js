import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CountrySchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});
