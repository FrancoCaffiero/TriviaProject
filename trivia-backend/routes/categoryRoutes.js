import {
  getCategories,
  addNewCategory,
} from "../controllers/categoryController";

const routes = (app) => {
  app.route("/api/categories").get(getCategories).post(addNewCategory);
};
export default routes;
