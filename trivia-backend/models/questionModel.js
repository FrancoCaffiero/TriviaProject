import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

export const QuestionSchema = new Schema({
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
  shortName: {
    type: String,
    required: true,
  },
  correctAnswerId: {
    type: ObjectId,
    required: true,
  },
});
