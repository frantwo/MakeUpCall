import React, { Component } from "react";
import ListOfCards from "../ListOfCards/ListOfCards";
import "./SearchArtist.css";
import Axios from "axios";
import SearchCity from "../SearchCity/SearchCity";
import Popularity from "../Popularity/Popularity";
import SearchServices from "../SearchServices/SearchServices";
import Price from "../Price/Price";

export default class SearchArtist extends Component {
  constructor() {
    super();
    this.state = {
      listOfArtist: [],
      // filterQuery: "",
      city: "",
      popularity: undefined,
      service: [],
      listOfServices: [],
      price: 0
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
    });
  };

  filterResults(e) {
    console.log("this.state.city");
    console.log(this.state.city);
    let filterByCity = this.state.city !== undefined && this.state.city !== "";
    let filterByPopularity =
      this.state.popularity !== undefined && this.state.popularity !== 0;
    let filterByService =
      this.state.service !== null && this.state.service.length !== 0;

    // let filterByPrice = this.state.price !== null && this.state.price;

    console.log("filterByCity");
    console.log(filterByCity);

    if (
      !filterByCity &&
      !filterByPopularity &&
      !filterByService //&&
      // !filterByPrice
    ) {
      this.getAllArtist();
    } else {
      let baseURL = `http://localhost:5000/artists/search?`;
      let queryString = "";
      if (filterByCity) {
        queryString = queryString + `&city=${this.state.city}`;
      }

      if (filterByPopularity) {
        queryString = queryString + `&ranking=${this.state.popularity}`;
      }

      if (filterByService) {
        let serviceString = this.state.service
          .map(onservice => onservice.value)
          .join(",");
        queryString = queryString + `&services=${serviceString}`;
      }
      // if (filterByPrice) {
      //   queryString = queryString + `&price=${this.state.price}`;
      // }

      queryString = queryString.substring(1, queryString.length);
      console.log("FILTER RESULTS CONSULTA ENVIADA A LA API");
      console.log(queryString);

      Axios.get(baseURL + queryString).then(responseFromApi => {
        console.log("VALORES DEVUELTOS DE LA API SEARCH");
        console.log(responseFromApi);
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

  PriceSelected(value) {
    console.log(this.state.listOfArtist);
    this.setState({ ...this.state, price: value });
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

            <div className="order-by-price" />
            <Price
              filterPrice={e => this.PriceSelected(e)}
              value={this.props.price}
            />
          </div>
          <div className="results-of-search">
            <ListOfCards
              listofartists={this.state.listOfArtist}
              ShowDetails={oneartist => this.props.ShowDetails(oneartist)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
