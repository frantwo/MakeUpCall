import Select from "react-select";
import React, { Component } from "react";

let options = [];

export default class SearchServices extends Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  componentDidUpdate() {
    options = this.props.AllServices.map(oneservice => {
      return { value: oneservice._id, label: oneservice.name };
    });
  }

  render() {
    return (
      <Select
        isMulti
        onChange={e => this.props.filterService(e)}
        options={options}
        placeholder="Select the services"
      />
    );
  }
}
