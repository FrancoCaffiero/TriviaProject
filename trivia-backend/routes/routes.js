import playerRoutes from "./playerRoutes";
import questionRoutes from "./questionRoutes";
import genderRoutes from "./genderRoutes";
import countryRoutes from "./countryRoutes";
import categoryRoutes from "./categoryRoutes";

const routes = (app) => {
  app.get("/", (req, res) => res.sendStatus(404));
  categoryRoutes(app);
  genderRoutes(app);
  countryRoutes(app);
  playerRoutes(app);
  questionRoutes(app);
};

export default routes;
