import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchTilList } from "../actions/list";
import TilItem from "../components/TilItem";


class Feed extends Component {
  componentDidMount() {
    this.props.fetchTilList();
  }

  componentWillReceiveProps(nextProps) {
  }

  renderTilList = (tilList) =>
    tilList.map((til, idx) =>
      <TilItem data={til} key={idx} />
    );

  render() {
    const {
      tilList,
    } = this.props;

    return (
      <div>
        { this.renderTilList(tilList) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tilList: state.lists.tilList,
  };
}

export default connect(mapStateToProps, {
  fetchTilList,
})(Feed);
