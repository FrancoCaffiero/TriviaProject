import { getGenders, addNewGender } from "../controllers/genderController";

const routes = (app) => {
  app.route("/api/genders").get(getGenders).post(addNewGender);
};
export default routes;
