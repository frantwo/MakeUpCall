import React, { Component } from "react";
import ListOfCards from "../ListOfCards/ListOfCards";
import "./SearchArtist.css";
import Axios from "axios";

export default class SearchArtist extends Component {
  constructor() {
    super();
    this.state = { listOfArtist: [], filterQuery: "" };
  }

  getAllArtist = () => {
    Axios.get(`http://localhost:5000/artists/list`).then(responseFromApi => {
      this.setState({
        listOfArtist: responseFromApi.data
      });
    });
  };

  searchOneArtist(e) {
    const filter = e.target.value;

    this.setState({
      filterQuery: filter
    });
    Axios.get(`http://localhost:5000/search?q=${filter}`).then(
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
            <input
              className="search"
              type="search"
              name="searchBox"
              placeholder="Search Beer"
              onChange={e => this.searchOneArtist(e)}
              value={this.state.filterQuery}
            />
          </div>
          <div className="results-of-search">
            <ListOfCards listofartists={this.state.listOfArtist} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
