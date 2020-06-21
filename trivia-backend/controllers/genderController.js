import mongoose from "mongoose";
import { GenderSchema } from "../models/genderModel";

const Gender = mongoose.model("Gender", GenderSchema);

export const getGenders = (req, res) => {
  Gender.find({})
    .sort("name")
    .exec((err, Gender) => {
      if (err) {
        res.send(err);
      }
      res.json(Gender);
    });
};

export const addNewGender = (req, res) => {
  let newGender = new Gender(req.body);

  newGender.save((err, Gender) => {
    if (err) {
      res.send(err);
    }
    res.json(Gender);
  });
};
