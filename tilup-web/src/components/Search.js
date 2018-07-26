import React, { Component } from "react";
import { connect } from "react-redux";

import '../apps/MainApp.css';
import TilItem from "./TilItem";
import { searchTil } from "../actions/search";
import Loading from "./Loading";


class Search extends Component {
  componentDidMount() {
    this.props.searchTil(this.props.query);
  }

  render() {
    let results = "";
    if (this.props.isSearching) {
      results = <Loading />;
    } else if (this.props.results.length === 0) {
      results = "Empty results.";
    } else {
      results = this.props.results.map((til, idx) =>
        <TilItem data={til} key={idx} />
      );
    }

    return (
      <React.Fragment>
        <div className="header-container">
          <h1>Search / { this.props.query }</h1>
          { results }
        </div>

      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  searchTil,
};

function mapStateToProps(state) {
  return {
    results: state.search.results,
    isSearching: state.search.isSearching,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
