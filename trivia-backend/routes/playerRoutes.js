import {
  addNewPlayer,
  getPlayers,
  getPlayerById,
  getPlayersRanking,
  updatePlayer,
} from "../controllers/playerControllers";

const routes = (app) => {
  app
    .route("/api/players")
    //GET endpoint
    .get(getPlayers)
    //POST endpoint
    .post(addNewPlayer);

  app.route("/api/playersRanking").get(getPlayersRanking);

  app
    //By Id
    .route("/api/player/:PlayerId")
    //GET endpoint
    .get(getPlayerById)
    //POST endpoint
    .post(updatePlayer);
};

export default routes;
