import React from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

// First we create our class
export default class QuestionWithOptions extends React.Component {
  // Then we add our constructor which receives our props
  constructor(props) {
    super(props);
    // Next we establish our state
    this.state = {
      question: { options: [] },
      questionsAnswered: [],
      questionsRemaining: 5,
      selectedAnswer: "",
    };
    // To use the 'this' keyword, we need to bind it to our function
    this.getQuestion = this.getQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  getQuestion() {
    console.log("Category: " + this.props.selectedCategory);
    axios
      .post("http://192.168.178.25:8000/api/questionWithOptions", {
        ids: this.state.questionsAnswered,
        category: this.props.selectedCategory,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ question: response.data });
        this.setState({
          questionsAnswered: [
            ...this.state.questionsAnswered,
            this.state.question._id,
          ],
        });
        this.setState({
          questionsRemaining: this.state.questionsRemaining - 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitAnswer(event) {
    this.setState({ selectedAnswer: event.currentTarget.id });
    if (this.state.question.correctAnswerId === event.currentTarget.id) {
      this.props.updateScore();
      this.props.addTime(10);
      console.log("si");
    } else {
      console.log("no");
    }

    const pauseTime = 3000;

    this.props.pauseTimer(pauseTime);

    this.refreshingTimer = setInterval(() => {
      this.clearStates();
      this.getQuestion();
      clearInterval(this.refreshingTimer);
      if (this.state.questionsRemaining === 0) {
        this.props.endGame();
      }
    }, pauseTime);
  }

  clearStates() {
    this.setState({ selectedAnswer: "" });
  }

  componentWillMount() {
    this.getQuestion();
  }

  componentDidMount() {
    this.props.startTimer();
  }

  changeStyle(optionId) {
    if (
      optionId === this.state.question.correctAnswerId &&
      this.state.selectedAnswer !== ""
    ) {
      return { backgroundColor: "green" };
    } else if (optionId === this.state.selectedAnswer) {
      return { backgroundColor: "red" };
    } else {
      return;
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshingTimer);
  }

  // The render function, where we actually tell the browser what it should show
  render() {
    return (
      <>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={this.state.question.shortName}
              image={"images/" + this.state.question._id + ".jpg"}
              title={this.state.question.shortName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.question.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid container spacing={1}>
              {this.state.question.options.map((option) => {
                return (
                  <Grid item xs={6}>
                    <Button
                      size="large"
                      variant="outlined"
                      id={option._id}
                      key={option._id}
                      onClick={this.submitAnswer}
                      style={this.changeStyle(option._id)}
                      disabled={this.state.selectedAnswer !== "" ? true : false}
                      fullWidth
                    >
                      {option.description}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </CardActions>
        </Card>
      </>
    );
  }
}
