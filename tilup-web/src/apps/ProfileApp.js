import React, { Component } from 'react';
import NavigationBar from "../components/NavigationBar";
import Profile from '../components/Profile';
import './ProfileApp.css';
import GreenPark from "../components/GreenPark";
import Repo from "../components/Repo";

class ProfileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      repoList: [1,2,3,4]
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const raw_data = this.props.user;
    let userData = {};
    if (raw_data) {
       userData= {
        email: raw_data.email,
        name: raw_data.displayName,
        img: raw_data.photoURL
      };
    }


    this.setState({userData});
  }

  renderRepoList() {
    return this.state.repoList.map((repoItem, idx) =>
      <Repo data={repoItem} key={idx} />);
  }

  render() {
    return (
      <div className="ProfileApp">
        <NavigationBar user={this.props.user} />
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
