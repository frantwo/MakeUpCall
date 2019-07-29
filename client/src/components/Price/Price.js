import Select from "react-select";
import React, { Component } from "react";
import "./Price.css";

export default class Price extends Component {
  constructor() {
    super();

    this.state = {
      options: [
        { label: "Higher first", value: "ASC" },
        { label: "Lowest first", value: "DESC" }
      ]
    };
  }

  componentDidMount() {
    this.setState = { ...this.state };
  }

  render() {
    return (
      <Select
        className="price-input"
        placeholder="Order by price"
        onChange={e => this.props.filterPrice(e)}
        options={this.state.options}
      />
    );
  }
}
