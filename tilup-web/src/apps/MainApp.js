import React, { Component } from 'react';
import './MainApp.css';
import Container from './Container';
import { PATH } from '../consts/consts';
import TilItem from "../components/TilItem";
import TilInput from "../components/TilInput";
import SelectBox from "../components/SelectBox";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NavigationBar from "../components/NavigationBar";
import {getTilList, getOneTil, postTil} from "../actions";
import axios from 'axios';
import firebase from 'firebase';
import getUserData from '../utils/getUserData';
import logo from '../components/logo.png'

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.submitTil = this.submitTil.bind(this);
    this.state = {
      tilList: [],
      optionList: [
        { text: "팔로잉하는 TIL" },
        { text: "내 TIL" },
        { text: "Fork한 TIL" },
      ]
    };
  };

  handleLogin() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("로긴됨", user, token);
      window.location.reload();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  componentDidMount() {
    this.checkHasUserSignedIn();
    if (this.props.type === PATH.MAIN) {
      this.loadData();
    } else if (this.props.type === PATH.TIL) {
      this.loadOneTil(this.props.index);
    } else if (this.props.type === PATH.SEARCH) {
      this.loadData(this.props.data);
    } else if (this.props.type === PATH.REPO) {
      this.loadData(this.props.data);
    } 
  }

  checkHasUserSignedIn() {
    //console.log(getUserData());
  }

  loadData(query) {
    const self = this;
    getTilList(query).then((response) => {
      self.setState({
        tilList: response.data
      });
    });
  }

  loadOneTil(idx) {
    const self = this;
    getOneTil(idx).then((response) => {
      self.setState({
        tilList: [response.data]
      });
    });
  }

  submitTil(data) {
    console.log("Current User >> ", getUserData(), data);
    const userData = getUserData();
    const self = this;
    const params = {
      headers: {
        authorization: userData.stsTokenManager.accessToken
      },
      body: {
        contents: data.contents,
        hash: data.tag,
        directory: data.repo,
        isPrivate: data.isPrivate
      }
    }

    postTil(params).then((response) => {
      self.loadData();
    });


    
  }

  renderTilList() {
    return (
      <div>
        {
          this.state.tilList.map((tilItem, idx) =>
            <TilItem data={tilItem} key={idx} />)
        }
      </div>
    )
  };

  render() {
    let result = '';
    if (this.props.type === PATH.SEARCH) {
      result = (
        <React.Fragment>
        <div className="header-container">
          <h1>Search / {this.props.data}</h1>
        </div>
          
        </React.Fragment>
      )
    } else if (this.props.type === PATH.REPO) {
      result = (
        <React.Fragment>
          <div className="header-container">
            <h1>Repo / {this.props.index}</h1>
          </div>
        </React.Fragment>
      )
    } else if (this.props.type === PATH.TIL) {
      result = (
        <React.Fragment>
          <SelectBox optionList={this.state.optionList} />
          {this.renderTilList()}
        </React.Fragment>
      )
    } else if (this.props.type === PATH.MAIN) {
      result = (
        <React.Fragment>
          <TilInput submitTil={this.submitTil} />
          <SelectBox optionList={this.state.optionList} />
          
        </React.Fragment>
      )
    }

    return (
      <Container>
        {!getUserData() ? (
          <div className="pleaseLogin">
            <img src={logo} className="pleaseLogin__logo" />
            <Button variant="extendedFab" color="#000" className="pleaseLogin__btn" onClick={this.handleLogin}>
              <img src="/res/octocat.svg" className="pleaseLogin__icon" />
              Login with GitHub</Button>
          </div>
        ) : ''}

        {result}
        {this.renderTilList()}
      </Container>
    );
  }
}

export default MainApp;
