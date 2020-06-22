import React, { Component } from "react";
import "./App.css";
import PlayerForm from "./Player/PlayerForm";
import QuestionWithOptions from "./Trivia/QuestionWithOptions";
import CategorySelector from "./Trivia/CategorySelector";
import Ranking from "./Player/Ranking";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: {},
      currentScore: 0,
      gendersList: [],
      countriesList: [],
      categoriesList: [],
      selectedCategory: "",
      time: 20,
      gameOverMessage: "",
      gameOverMessageOpen: false,
      addedTimeMessageOpen: false,
    };
    this.updatePlayer = this.updatePlayer.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.getGenders = this.getGenders.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.addTime = this.addTime.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.showAddedTime = this.showAddedTime.bind(this);
    this.closeAddedTime = this.closeAddedTime.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  getGenders() {
    axios
      .get("http://192.168.178.25:8000/api/genders")
      .then((response) => {
        console.log(response.data);
        this.setState({ gendersList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCategories() {
    axios
      .get("http://192.168.178.25:8000/api/categories")
      .then((response) => {
        console.log(response.data);
        this.setState({ categoriesList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountries() {
    axios
      .get("http://192.168.178.25:8000/api/countries")
      .then((response) => {
        console.log(response.data);
        this.setState({ countriesList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updatePlayer(player) {
    this.setState({ currentPlayer: player });
    console.log(this.state.player);
  }

  updateScore() {
    const score = 10 + 2 * this.state.time; //10 point per question plus 2 times the time left
    this.setState({ currentScore: this.state.currentScore + score });
    this.showAddedTime();
    console.log(this.state.currentScore);
    this.setState({ remainingQuestions: this.state.remainingQuestions - 1 });
  }

  componentDidMount() {
    this.getGenders();
    this.getCountries();
    this.getCategories();
  }

  selectCategory(event) {
    this.setState(
      { selectedCategory: event.currentTarget.id },
      this.props.history.push("/trivia")
    );
  }

  tick() {
    this.setState({ time: this.state.time - 1 });
    if (this.state.time === 0) {
      this.showMessage();
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.timer);
    this.updatePlayer({
      ...this.state.currentPlayer,
      score: this.state.currentScore,
    });
    this.submitScore();
    this.props.history.push("/ranking");
  }

  submitScore() {
    axios
      .post(
        "http://192.168.178.25:8000/api/player/" + this.state.currentPlayer._id,
        {
          score: this.state.currentPlayer.score,
        }
      )
      .then((response) => {
        this.updatePlayer({
          ...this.state.currentPlayer,
          scoreUpdated: true,
        });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showAddedTime() {
    this.setState({
      addedTimeMessageOpen: true,
    });
  }

  closeAddedTime() {
    this.setState({
      addedTimeMessageOpen: false,
    });
  }

  showMessage() {
    this.setState({ gameOverMessageOpen: true });
  }

  closeMessage() {
    this.setState({ gameOverMessageOpen: false });
  }

  startTimer() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  addTime(time) {
    this.setState({ time: this.state.time + time });
  }

  pauseTimer(time) {
    clearInterval(this.timer);
    const pausingTimer = setInterval(() => {
      this.startTimer();
      this.closeAddedTime();
      clearInterval(pausingTimer);
    }, time);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="button">Trivia game</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="button">
                  {this.state.currentPlayer.name}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="button">
                  {this.state.currentScore > 0
                    ? "Your score: " + this.state.currentScore
                    : ""}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="button">
                  {this.state.selectedCategory === ""
                    ? ""
                    : "Time left: " + this.state.time}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <br />
        <br />
        <Dialog
          open={this.state.gameOverMessageOpen}
          onClose={this.closeMessage}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">GAME OVER</DialogTitle>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          key="addedTimeMessage"
          open={this.state.addedTimeMessageOpen}
          onClose={this.closeAddedTime}
          autoHideDuration={1000}
        >
          <MuiAlert
            onClose={this.closeAddedTime}
            severity="success"
            variant="filled"
          >
            +10 secs
          </MuiAlert>
        </Snackbar>
        <Container alignItems="center" justify="center">
          <Container maxWidth="sm">
            <Switch>
              <Route path="/categorySelection">
                <CategorySelector
                  categories={this.state.categoriesList}
                  selectCategory={this.selectCategory}
                />
              </Route>
              <Route path="/trivia">
                <QuestionWithOptions
                  selectedCategory={this.state.selectedCategory}
                  updateScore={this.updateScore}
                  startTimer={this.startTimer}
                  addTime={this.addTime}
                  pauseTimer={this.pauseTimer}
                  endGame={this.endGame}
                />
              </Route>
              <Route path="/newPlayer">
                <PlayerForm
                  updatePlayer={this.updatePlayer}
                  gendersList={this.state.gendersList}
                  countriesList={this.state.countriesList}
                />
              </Route>
              <Route path="/ranking">
                <Ranking currentPlayer={this.state.currentPlayer} />
              </Route>
              <Route path="/">
                <Redirect to="/newPlayer" />
              </Route>
            </Switch>
          </Container>
        </Container>
      </>
    );
  }
}

export default withRouter(App);
