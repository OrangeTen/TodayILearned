import React, { Component } from 'react';
import { connect } from "react-redux";

import './ProfileApp.css';
import Profile from '../components/Profile';
import GreenPark from "../components/GreenPark";
import Repo from "../components/Repo";

class ProfileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoList: [1,2,3,4]
    };
  }

  componentDidMount() {
  }

  renderRepoList() {
    return this.state.repoList.map((repoItem, idx) =>
      <Repo data={repoItem} key={idx} />);
  }

  render() {
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
              {this.renderRepoList()}
            </div>
            <GreenPark />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
  };
}

export default connect(mapStateToProps)(ProfileApp);
