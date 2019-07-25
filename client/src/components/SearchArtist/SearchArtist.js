import React, { Component } from "react";
import ListOfCards from "../ListOfCards/ListOfCards";
import "./SearchArtist.css";

export default class SearchArtist extends Component {
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
              // onChange={e => this.searchOneBeer(e)}
              // value={this.state.filterQuery}
            />
          </div>
          <div className="results-of-search">
            <ListOfCards />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
