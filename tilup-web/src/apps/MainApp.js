import React, { Component } from 'react';
import './MainApp.css';
import Container from './Container';
import { PATH } from '../consts/consts';
import TilItem from "../components/TilItem";
import TilInput from "../components/TilInput";
import SelectBox from "../components/SelectBox";
import NavigationBar from "../components/NavigationBar";
import {getTilList, getOneTil, postTil} from "../actions";
import axios from 'axios';
import firebase from 'firebase';
import getUserData from '../utils/getUserData';

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
        {result}
        {this.renderTilList()}
      </Container>
    );
  }
}

export default MainApp;
