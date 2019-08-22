import Select from "react-select";
import React, { Component } from "react";
import csc from "country-state-city";
import "./SearchCity.css";

const SpainID = "205";

export default class SearchCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      options: [{ value: "", label: "" }]
    };

    this.options = csc.getStatesOfCountry(SpainID).map(onecity => {
      return { value: onecity.name, label: onecity.name };
    });
  }

  componentDidMount() {
    this.options.unshift("");
    this.setState({
      selectedValue: this.props.defaultValue
    });
  }

  handleChange(selectedOption) {
    if (selectedOption == null) {
      selectedOption = { value: "", label: "" };
    }
    this.props.filterCity(selectedOption);
    this.setState({ selectedValue: selectedOption.value });
  }

  render() {
    return (
      <Select
        value={this.options.filter(
          ({ value }) => value === this.state.selectedValue
        )}
        onChange={e => this.handleChange(e)}
        options={this.options}
        isClearable={true}
        placeholder="Select the city"
      />
    );
  }
}
