import React, { Component } from 'react';
import NavigationBar from "../components/NavigationBar";
import Profile from '../components/Profile';
import './ProfileApp.css';
import {getRepoListWithUid} from "../actions";
import GreenPark from "../components/GreenPark";
import Repo from "../components/Repo";
import {getFirebaseCurrentUser} from "../utils/firebaseUtils";
import getUserData from "../utils/getUserData";

class ProfileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      repoList: [1,2,],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const raw_data = getUserData();
    const userData = {
      email: raw_data.email,
      name: raw_data.displayName,
      img: raw_data.photoURL
    };
    this.setState({userData});
  }

  renderRepoList() {
    return this.state.repoList.map((repoItem, idx) =>
      <Repo data={repoItem} key={idx} />);
  }

  render() {
    return (
      <div className="ProfileApp">
        <NavigationBar />
          <div className="ProfileApp__body container">
            <div className="profile">
              <Profile
                  img={this.state.userData.img}
                  name={this.state.userData.name}
                  id={this.state.userData.email}
              />
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

export default ProfileApp;
