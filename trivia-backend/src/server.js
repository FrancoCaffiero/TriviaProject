import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "../routes/routes";
import cors from "cors";

const app = express();
const PORT = 8000;
const dbURL = "mongodb://localhost:27017";
const dbName = "trivia-db";

//MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(`${dbURL}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Body Parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors setup
app.use(cors());

//routes
routes(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
