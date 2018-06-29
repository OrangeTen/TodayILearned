import React, { Component } from 'react';
import NavigationBar from "../components/NavigationBar";
import Profile from '../components/Profile';
import './ProfileApp.css';
import BasicLayout from "../components/BasicLayout";
import {getRepoListWithUid, getUserData} from "../actions";
import GreenPark from "../components/GreenPark";
import Repo from "../components/Repo";
import {getFirebaseCurrentUser, isSignedIn} from "../utils/firebaseUtils";

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
    if (isSignedIn()) {
      let user = getFirebaseCurrentUser();

      this.setState({
        userData: user,
      });

      getRepoListWithUid(user.uid)
        .then((response) => {
          this.setState({
            repoList: response.data
          });
        });
    }
  }

  renderRepoList() {
    return this.state.repoList.map((repoItem, idx) =>
      <Repo data={repoItem} key={idx} />);
  }

  render() {
    return (
      <div className="ProfileApp">
          <NavigationBar />
          <BasicLayout>
            <div className="body">
              <div className="profile">
                <Profile
                    img={this.state.userData.img}
                    name={this.state.userData.name}
                    id={this.props.id}
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
          </BasicLayout>
      </div>
    );
  }
}

export default ProfileApp;
