import React, { Component } from "react";

export default class SearchCity extends Component {
  constructor() {
    super();
    this.state = { cities: [] };
  }

  componentDidMount() {
    let arr = ["Madrid", "Barcelona"];
    let tmparr = [];
    for (let cont = 0; cont < arr.length; cont++) {
      tmparr.push(
        <option key={cont} value={arr[cont]}>
          {" "}
          {arr[cont]}{" "}
        </option>
      );
    }

    this.setState({
      cities: [...tmparr]
    });
  }

  render() {
    return (
      <div>
        <select id="select">{this.state.cities}</select>
      </div>
    );
  }
}
