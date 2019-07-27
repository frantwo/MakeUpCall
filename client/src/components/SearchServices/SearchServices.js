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
    console.log("componentDidUpdate");
    console.log(this.props.AllServices);
    options = this.props.AllServices.map(oneservice => {
      return { value: oneservice._id, label: oneservice.name };
    });
  }

  render() {
    console.log("TOY EN RENDER DEL NENE");
    return (
      <Select
        isMulti
        onChange={e => this.props.filterService(e)}
        options={options}
      />
    );
  }
}
