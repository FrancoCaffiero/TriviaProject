import mongoose from "mongoose";
import { CategorySchema } from "../models/categoryModel";

const Category = mongoose.model("Category", CategorySchema);

export const getCategories = (req, res) => {
  Category.find({}, (err, Category) => {
    if (err) {
      res.send(err);
    }
    res.json(Category);
  });
};

export const addNewCategory = (req, res) => {
  let newCategory = new Category(req.body);

  newCategory.save((err, Category) => {
    if (err) {
      res.send(err);
    }
    res.json(Category);
  });
};
