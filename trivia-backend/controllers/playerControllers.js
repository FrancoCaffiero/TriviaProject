import mongoose from "mongoose";
import { PlayerSchema } from "../models/playerModel";

const Player = mongoose.model("Player", PlayerSchema);

export const addNewPlayer = (req, res) => {
  let newPlayer = new Player(req.body);

  newPlayer.save((err, Player) => {
    if (err) {
      res.send(err);
    }
    res.json(Player);
  });
};

export const getPlayersRanking = (req, res) => {
  Player.find()
    .sort({ score: -1 })
    .limit(20)
    .then((err, Players) => {
      if (err) {
        res.send(err);
      }
      res.json(Players);
    });
};

export const getPlayers = (req, res) => {
  Player.find({}, (err, Player) => {
    if (err) {
      res.send(err);
    }
    res.json(Player);
  });
};

export const getPlayerById = (req, res) => {
  Player.findById(req.params.PlayerId, (err, Player) => {
    if (err) {
      res.send(err);
    }
    res.json(Player);
  });
};

export const updatePlayer = (req, res) => {
  let _id = req.params.PlayerId;
  Player.findByIdAndUpdate(
    { _id },
    { score: req.body.score },
    (err, Player) => {
      if (err) {
        res.send(err);
      }
      res.json(Player);
    }
  );
};
