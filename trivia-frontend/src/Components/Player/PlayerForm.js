import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { TextField, Button, MenuItem, Paper, Grid } from "@material-ui/core";

class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: { name: "", gender: {}, age: "", country: "" },
    };
    this.submitPlayer = this.submitPlayer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      player: {
        ...this.state.player,
        [name]: value,
      },
    });
  }

  submitPlayer(event) {
    event.preventDefault();
    axios
      .post("http://192.168.178.25:8000/api/players", {
        name: this.state.player.name,
        gender: this.state.player.gender.code,
        age: this.state.player.age,
        country: this.state.player.country,
      })
      .then((response) => {
        console.log(response.data);
        this.props.updatePlayer(response.data);
      })
      .then(this.props.history.push("/categorySelection"))

      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <Paper>
        <form onSubmit={this.submitPlayer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center">
                <Grid container xs={8}>
                  <TextField
                    id="playerName-input"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center">
                <Grid container xs={8}>
                  <TextField
                    id="playerGender-input"
                    name="gender"
                    label="Gender"
                    select
                    onChange={this.handleInputChange}
                    variant="outlined"
                    fullWidth
                  >
                    {this.props.gendersList.map((gender) => (
                      <MenuItem key={gender.code} value={gender.code}>
                        {gender.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center">
                <Grid container xs={8}>
                  <TextField
                    id="playerAge-input"
                    name="age"
                    label="Age"
                    type="number"
                    onChange={this.handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center">
                <Grid container xs={8}>
                  <TextField
                    id="playerCountry-input"
                    name="country"
                    label="Country"
                    select
                    onChange={this.handleInputChange}
                    variant="outlined"
                    fullWidth
                  >
                    {this.props.countriesList.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center">
                <Grid container xs={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Play
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default withRouter(PlayerForm);
