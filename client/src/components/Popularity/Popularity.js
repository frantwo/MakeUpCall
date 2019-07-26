import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";

export default class Popularity extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
      rating_half_star: 3.5
    };
  }

  onStarClick(nextValue, prevValue, name) {
    console.log(
      "name: %s, nextValue: %s, prevValue: %s",
      name,
      nextValue,
      prevValue
    );
    this.setState({ rating: nextValue });
  }

  onStarClickHalfStar(nextValue, prevValue, name, e) {
    debugger;
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }

    console.log(
      "name: %s, nextValue: %s, prevValue: %s",
      name,
      nextValue,
      prevValue
    );
    // console.log(e);
    this.setState({ rating_half_star: nextValue });
  }

  render() {
    switch (this.props.mode) {
      case "editable-with-handlers":
        return (
          <div className="popularity-container">
            {/* <h3>
              Editable with handlers (Rating from state is {this.state.rating}):
            </h3> */}
            <div style={{ fontSize: 20 }}>
              <StarRatingComponent
                name="app2"
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick.bind(this)}
              />
            </div>
          </div>
        );
      case "noneditable":
        return (
          <div>
            {/* <h3>Non-Editable:</h3> */}
            <div style={{ fontSize: 30 }}>
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
