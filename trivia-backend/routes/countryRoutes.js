import { getCountries, addNewCountry } from "../controllers/countryController";

const routes = (app) => {
  app.route("/api/countries").get(getCountries).post(addNewCountry);
};
export default routes;
