import React, { Component } from "react";
import ListOfCards from "../ListOfCards/ListOfCards";
import "./SearchArtist.css";
import Axios from "axios";
import SearchCity from "../SearchCity/SearchCity";
import Popularity from "../Popularity/Popularity";

export default class SearchArtist extends Component {
  constructor() {
    super();
    this.state = { listOfArtist: [], filterQuery: "" };
  }

  getAllArtist = () => {
    Axios.get(`http://localhost:5000/artists/list`).then(responseFromApi => {
      this.setState({
        listOfArtist: responseFromApi.data,
        filterQuery: ""
      });
    });
  };

  filterbyCity(e) {
    if (e === "anycity") {
      return this.getAllArtist;
    }
    const filter = e.target.value;

    this.setState({
      filterQuery: filter
    });
    Axios.get(`http://localhost:5000/artists/search?q=${filter}`).then(
      responseFromApi => {
        this.setState({
          listOfArtist: responseFromApi.data
        });
      }
    );
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
            <SearchCity onChange={e => this.filterbyCity(e)} />
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
          </div>
          <div className="results-of-search">
            <ListOfCards listofartists={this.state.listOfArtist} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
