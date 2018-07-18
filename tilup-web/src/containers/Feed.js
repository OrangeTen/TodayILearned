import React, { Component } from "react";
import { fetchTilList } from "../actions/index";
import { connect } from "react-redux";

class Feed extends Component {
  componentDidMount() {
    this.props.fetchTilList();
  }

  componentWillReceiveProps(nextProps) {
    // const { tilList } = nextProps;
  }

  renderTilList = (tilList) => {
    return tilList.map(til => <div style={{border: "1px solid black", margin: "1rem"}}>{til.contents}</div>);
  };

  render() {
    const {
      tilList,
    } = this.props;

    return (
      <div>
        <div>Data: {}</div>
        {this.renderTilList(tilList)}
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
