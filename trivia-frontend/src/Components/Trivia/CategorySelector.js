import React, { Component } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

class CategorySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Please select a category
          </Typography>
        </CardContent>
        <CardActions>
          {this.props.categories.map((category) => {
            return (
              <Button
                size="small"
                key={category.code}
                id={category.name}
                onClick={this.props.selectCategory}
              >
                {category.name}
              </Button>
            );
          })}
        </CardActions>
      </Card>
    );
  }
}

export default CategorySelector;
