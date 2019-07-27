import React, { Component } from "react";
import ListOfCards from "../ListOfCards/ListOfCards";
import "./SearchArtist.css";
import Axios from "axios";
import SearchCity from "../SearchCity/SearchCity";
import Popularity from "../Popularity/Popularity";
import SearchServices from "../SeachServices/SearchServices";

export default class SearchArtist extends Component {
  constructor() {
    super();
    this.state = {
      listOfArtist: [],
      filterQuery: "",
      city: "",
      popularity: undefined,
      service: "",
      listOfServices: []
    };
  }

  getAllArtist = () => {
    Axios.get(`http://localhost:5000/artists/list`).then(responseFromApi => {
      this.setState({
        ...this.state,
        listOfArtist: responseFromApi.data
      });
    });
  };

  getAllServices = () => {
    Axios.get(`http://localhost:5000/services/list`).then(responseFromApi => {
      this.setState({
        ...this.state,
        listOfServices: [...responseFromApi.data]
      });
      console.log("HE ACABADO LA LLAMADA A AXIOS DE SERVICIOS!!!!");
      console.log(this.state.listOfServices);
    });
  };

  filterResults(e) {
    if (
      (this.state.city === undefined || this.state.city === "") &&
      (this.state.popularity === undefined || this.state.popularity === 0)
    ) {
      this.getAllArtist();
    } else {
      Axios.get(
        `http://localhost:5000/artists/search?city=${this.state.city}&ranking=${
          this.state.popularity
        }`
      ).then(responseFromApi => {
        this.setState({
          ...this.state,
          listOfArtist: responseFromApi.data
        });
      });
    }
  }

  citySelected(city) {
    this.setState({ ...this.state, city: city.value });
  }

  popularitySelected(value) {
    this.setState({ ...this.state, popularity: value });
  }

  ServiceSelected(value) {
    this.setState({ ...this.state, service: value });
  }

  componentDidMount() {
    this.getAllArtist();
    this.getAllServices();
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

            <div className="popularity">
              <p>Popularity:</p>
              <Popularity
                mode="editable-with-handlers"
                filterPopularity={e => this.popularitySelected(e)}
                value={this.state.popularity}
              />
            </div>

            <SearchServices
              AllServices={this.state.listOfServices}
              filterService={e => this.ServiceSelected(e)}
            />

            <button onClick={e => this.filterResults(e)}>SEARCH</button>
          </div>
          <div className="results-of-search">
            <ListOfCards listofartists={this.state.listOfArtist} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
