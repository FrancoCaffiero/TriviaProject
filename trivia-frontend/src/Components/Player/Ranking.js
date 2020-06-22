import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  playerSelected: {
    color: theme.palette.primary.light,
    background: theme.palette.primary.dark,
  },
}));

export default function Ranking({ currentPlayer }) {
  const classes = useStyles();
  const [playersList, setPlayerList] = useState([]);

  useEffect(
    function () {
      async function getPlayerList() {
        try {
          axios
            .get("http://192.168.178.25:8000/api/playersRanking")
            .then((response) => {
              console.log(response.data);
              setPlayerList(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log("error", error);
        }
      }
      getPlayerList();
    },
    [currentPlayer]
  );

  function RankingRow({ player, pos, currentPlayer }) {
    return (
      <React.Fragment>
        <div className={currentPlayer ? classes.playerSelected : null}>
          <Grid container xs={12} spacing={1}>
            <Grid item xs={2}>
              {pos}
            </Grid>
            <Grid item xs={8}>
              {player.name}
            </Grid>
            <Grid item xs={2}>
              {player.score}
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <br />
      <center>
        <Button variant="contained" color="primary" type="submit">
          <Link to="/">Play again</Link>
        </Button>
      </center>
      <br />
      <br />
      <Paper className={classes.paper}>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={12}>
            RANKING
          </Grid>
          <Grid item xs={2}>
            Pos.
          </Grid>
          <Grid item xs={8}>
            Name
          </Grid>
          <Grid item xs={2}>
            Points
          </Grid>
        </Grid>
        <br />
        <Paper className={classes.paper}>
          {playersList.map((player, key) => {
            return (
              <RankingRow
                player={player}
                pos={key + 1}
                currentPlayer={player._id === currentPlayer._id ? true : false}
              />
            );
          })}
        </Paper>
      </Paper>
    </div>
  );
}
