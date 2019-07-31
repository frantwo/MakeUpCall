import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";

export default class Popularity extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    // console.log(
    //   "name: %s, nextValue: %s, prevValue: %s",
    //   name,
    //   nextValue,
    //   prevValue
    // );
    nextValue = nextValue === 1 && prevValue === 1 ? 0 : nextValue;
    this.props.filterPopularity(nextValue);

    this.setState({ rating: nextValue });
  }

  render() {
    switch (this.props.mode) {
      case "editable-with-handlers":
        return (
          <div className="popularity-container">
            <div style={{ fontSize: 20 }}>
              <StarRatingComponent
                name="app2"
                starCount={5}
                value={this.props.value}
                onStarClick={this.onStarClick.bind(this)}
              />
            </div>
          </div>
        );
      case "noneditable":
        return (
          <div>
            <div style={{ fontSize: 20 }}>
              <StarRatingComponent
                name="app4"
                editing={false}
                starCount={5}
                value={3}
              />
            </div>
          </div>
        );
      default:
        console.log("mode choose not exists");
        break;
    }
  }
}
