// import React, { Component } from "react";
// import csc from "country-state-city";
// import Select from 'react-select';
// import "./SearchCity.css";

// export default class SearchCity extends Component {
//   constructor() {
//     super();
//     this.state = { cities: [] };
//   }

//   componentDidMount() {
//     let SpainID = "205";
//     let spaincities = csc.getStatesOfCountry(SpainID);
//     let tmparr = [];
//     for (let cont = 0; cont < spaincities.length; cont++) {
//       tmparr.push(
//         <option key={spaincities[cont].id} value={spaincities[cont].name}>
//           {spaincities[cont].name}
//         </option>
//       );
//     }

//     this.setState({
//       cities: [...tmparr]
//     });
//   }

//   render() {
//     return (
//       <div>
//         <select id="select" onChange={e => this.props.citySelected(e)}>
//           <option key={0} value="">
//             Not City
//           </option>
//           {this.state.cities}
//         </select>
//       </div>
//     );
//   }
// }

// import React, { Component } from "react";
// import csc from "country-state-city";
// import Select from "react-select";
// import "./SearchCity.css";

// export default class SearchCity extends Component {
//   constructor() {
//     super();
//     this.state = { cities: [], selectedOption: "" };
//   }
//   componentDidMount() {
//     debugger;
//     let SpainID = "205";
//     const options = csc.getStatesOfCountry(SpainID);
//     this.setState({
//       cities: [...options],
//       selectedOption: this.props.children
//     });
//   }
//   // handleChange = selectedOption => {
//   //   this.setState({ selectedOption });
//   //   console.log(`Option selected:`, selectedOption);
//   // };
//   render() {
//     // const { selectedOption } = this.state;

//     return (
//       <Select
//         value={this.state.selectedOption}
//         onChange={e => this.props.filterCity(e)}
//         options={this.state.cities}
//       />
//     );
//   }
// }

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
        value={selectedOption}
        onChange={e => this.props.filterCity(e)}
        options={options}
      />
    );
  }
}
