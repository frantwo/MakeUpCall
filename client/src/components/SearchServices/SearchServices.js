import Select from "react-select";
import React, { Component } from "react";

export default class SearchServices extends Component {
  state = {
    options: []
  };

  // as per https://stackoverflow.com/questions/49617486/how-to-use-lifecycle-method-getderivedstatefromprops-as-opposed-to-componentwill
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      options: nextProps.AllServices.map(oneservice => {
        return { value: oneservice._id, label: oneservice.name };
      })
    };
  }

  render() {
    return (
      <Select
        isMulti
        onChange={e => this.props.filterService(e)}
        options={this.state.options}
        placeholder="Select the services"
      />
    );
  }
}
