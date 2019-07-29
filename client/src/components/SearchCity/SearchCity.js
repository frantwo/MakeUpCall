import Select from "react-select";
import React, { Component } from "react";
import csc from "country-state-city";
import "./SearchCity.css";

const SpainID = "205";
let options = csc.getStatesOfCountry(SpainID).map(onecity => {
  return { value: onecity.name, label: onecity.name };
});
options.unshift("");

export default class SearchCity extends Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.props.children; //this.state;

    return (
      <Select
        placeholder="Select the city"
        value={selectedOption}
        onChange={e => this.props.filterCity(e)}
        options={options}
      />
    );
  }
}
