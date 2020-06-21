import {
  getQuestions,
  addNewQuestion,
  getOptionWithOptions,
  addNewOption,
} from "../controllers/questionControllers";

const routes = (app) => {
  app
    .route("/api/questions")
    //GET endpoint
    .get(getQuestions)
    //POST endpoint
    .post(addNewQuestion);

  app
    .route("/api/questionWithOptions")
    //POST endpoint
    .post(getOptionWithOptions);

  app
    .route("/api/options")
    //POST endpoint
    .post(addNewOption);
};

export default routes;
