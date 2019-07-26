import React, { Component } from "react";
import ListOfCards from "../ListOfCards/ListOfCards";
import "./SearchArtist.css";
import Axios from "axios";
import SearchCity from "../SearchCity/SearchCity";
import Popularity from "../Popularity/Popularity";

export default class SearchArtist extends Component {
  constructor() {
    super();
    this.state = { listOfArtist: [], filterQuery: "", city: "" };
  }

  getAllArtist = () => {
    Axios.get(`http://localhost:5000/artists/list`).then(responseFromApi => {
      this.setState({
        listOfArtist: responseFromApi.data,
        city: "",
        filterQuery: ""
      });
    });
  };

  filterbyCity(e) {
    // city = e.target.value;

    // this.setState({
    //   filterQuery: filter
    // });
    // `http://localhost:5000/artists/search?city=${this.state.city}&ranking=${this.state.ranking}`
    Axios.get(
      `http://localhost:5000/artists/search?city=${this.state.city}`
    ).then(responseFromApi => {
      this.setState({
        listOfArtist: responseFromApi.data
      });
    });
  }

  citySelected(e) {
    debugger;
    this.setState({ ...this.state, city: e.value });
  }

  componentDidMount() {
    this.getAllArtist();
  }

  render() {
    return (
      <React.Fragment>
        <div className="search-wrapper">
          <div className="search-tool">
            <h3>FILTER</h3>
            <SearchCity filterCity={e => this.citySelected(e)}>
              {this.state.city}>
            </SearchCity>
            {/* <input
              className="search"
              type="search"
              name="searchBox"
              placeholder="Enter the city"
              onChange={e => this.searchOneArtist(e)}
              value={this.state.filterQuery}
            /> */}
            <div className="popularity">
              <p>Popularity:</p>
              <Popularity mode="editable-with-handlers" />
            </div>
            <button>SEARCH</button>
          </div>
          <div className="results-of-search">
            <ListOfCards listofartists={this.state.listOfArtist} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
