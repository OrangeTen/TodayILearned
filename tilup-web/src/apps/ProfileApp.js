import React, { Component } from 'react';
import NavigationBar from "../components/NavigationBar";
import Profile from '../components/Profile';
import styles from './ProfileApp.css';
import BasicLayout from "../components/BasicLayout";

class ProfileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
          name: '오렌지',
          id: 'oragne10',
          img: '/res/octocat.svg'
      }
    };
  }
  render() {
    return (
      <div className="ProfileApp">
          <NavigationBar />
          <BasicLayout>
            <div class="body">
              <div class="profile">
                <Profile
                    img={this.state.userData.img}
                    name={this.state.userData.name}
                    id={this.props.id}
                />
              </div>
              <div class="contents">
              </div>
            </div>
          </BasicLayout>
      </div>
    );
  }
}

export default ProfileApp;
