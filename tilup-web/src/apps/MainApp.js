import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './MainApp.css';
import Container from './Container';
import { PATH } from '../consts/consts';
import TilItem from "../components/TilItem";
import TilInput from "../components/TilInput";
import SelectBox from "../components/SelectBox";
import { getTilList, getOneTil, postTil } from "../actions";
import logo from '../components/logo.png'
import * as log from "../utils/log";
import * as FirebaseUtils from "../utils/firebaseUtils";


class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tilList: [],
      optionList: [
        { text: "팔로잉하는 TIL" },
        { text: "내 TIL" },
        { text: "Fork한 TIL" },
      ]
    };

    this.submitTil = this.submitTil.bind(this);
  };

  handleLogin() {
    FirebaseUtils.requestLogin()
      .then(_ => {
        window.location.reload();
      });
  }

  componentDidMount() {
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
    const self = this;
    const params = {
      body: {
        contents: data.contents,
        hash: data.tag,
        directory: data.repo,
        isPrivate: data.isPrivate
      }
    };

    log.d('apps/MainApp.js', 'submitTil', 'params=', params);

    postTil(params)
      .then((response) => {
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
      <Container user={this.props.user}>
        {!this.props.user ? (
          <div className="pleaseLogin">
            <img src={logo} className="pleaseLogin__logo" />
            <Button variant="extendedFab" color="#000" className="pleaseLogin__btn" onClick={this.handleLogin}>
              <img src="/res/octocat.svg" className="pleaseLogin__icon" />
              Login with GitHub
            </Button>
          </div>
        ) : ''}

        {this.props.user ? result : ''}
        {this.props.user ? this.renderTilList() : ''}
      </Container>
    );
  }
}

export default MainApp;
