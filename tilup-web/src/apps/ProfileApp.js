import React, { Component } from 'react';
import { connect } from "react-redux";

import './ProfileApp.css';
import Profile from '../components/Profile';
import GreenPark from "../components/GreenPark";
import Repo from "../components/Repo";
import { fetchDirectoryList } from "../actions/directory";
import Loading from "../components/Loading";

class ProfileApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDirectoryList();
  }

  renderRepoList() {
    let repos = "";
    if (this.props.isFetchingList) {
      repos = <Loading />
    } else {
      repos = this.props.directoryList.map((repoItem, idx) =>
        <Repo data={repoItem}
              key={idx}
              index={idx} />);
    }

    return repos;
  }

  render() {
    const repos = this.renderRepoList();

    return (
      <div className="ProfileApp">
        <div className="ProfileApp__body container">
          <div className="profile">
            { this.props.user ?
              <Profile
                img={this.props.user.photoURL}
                name={this.props.user.displayName}
                id={this.props.user.email}
              /> : '' }
          </div>
          <div class="contents">
            <div className="repos">
              <div className="repos__title">
                Popular Repositories
              </div>
              { repos }
            </div>
            <GreenPark />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchDirectoryList,
};

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
    directoryList: state.directory.directoryList,
    isFetchingList: state.directory.isFetchingList,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileApp);
