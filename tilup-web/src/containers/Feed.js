import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchTilList } from "../actions/list";


class Feed extends Component {
  componentDidMount() {
    this.props.fetchTilList();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSigningIn !== nextProps.isSigningIn) {
      if (nextProps.isSigningIn) {

      }
    }
  }

  renderTilList = (tilList) => {
    return tilList.map(til =>
      <div style={{
        border: "1px solid black",
        margin: "1rem"
      }}>
        { til.contents }
      </div>
    );
  };

  render() {
    const {
      tilList,
    } = this.props;

    return (
      <div>
        <div>Data: {}</div>
        { this.renderTilList(tilList) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tilList: state.lists.tilList,
    isSigningIn: state.user.isSigningIn,
  };
}

export default connect(mapStateToProps, {
  fetchTilList,
})(Feed);
