import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
  },
  score: {
    type: Number,
  },
});
