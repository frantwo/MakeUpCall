import Select from "react-select";
import React, { Component } from "react";
import "./Price.css";

export default class Price extends Component {
  options = ["Expensive", "Cheapest"];

  render() {
    return (
      <Select
        className="price-input"
        placeholder="Order by price"
        onChange={e => this.props.filterPrice(e)}
        options={this.options}
      />
    );
  }
}
