import mongoose from "mongoose";
import { CountrySchema } from "../models/countryModel";

const Country = mongoose.model("Country", CountrySchema);

export const getCountries = (req, res) => {
  Country.find({})
    .sort("name")
    .exec((err, Country) => {
      if (err) {
        res.send(err);
      }
      res.json(Country);
    });
};

export const addNewCountry = (req, res) => {
  let newCountry = new Country(req.body);

  newCountry.save((err, Country) => {
    if (err) {
      res.send(err);
    }
    res.json(Country);
  });
};
