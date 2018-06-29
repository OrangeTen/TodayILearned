import React, { Component } from 'react';
import './MainApp.css';
import Container from './Container';
import { PATH } from '../consts/consts';
import TilItem from "../components/TilItem";
import TilInput from "../components/TilInput";
import SelectBox from "../components/SelectBox";
import NavigationBar from "../components/NavigationBar";
import {getTilList} from "../actions";
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
    this.loadDate();
  }

  checkHasUserSignedIn() {
    console.log(getUserData());
  }

  loadDate() {
    const self = this;
    getTilList().then((response) => {
      self.setState({
        tilList: response.data
      });
    });
  }

  submitTil(data) {
    console.log("Current User >> ",firebase.auth().currentUser);
    axios
      .post('/api/til', {
        headers: {
          token: ''
        },
        params: {
          contents: data.contents,
          hash: data.tag,
          directory: data.repo,
          isPrivate: data.isPrivate
        }
      }).then(res => {
      console.log("SubmitTil Result >> ", res);
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
          <div>검색 결과</div>
          <div>{this.props.data}</div>
        </React.Fragment>
      )
    } else if (this.props.type === PATH.REPO) {
      result = (
        <React.Fragment>
          <div>REPO VIEW</div>
          <div>index NUM : {this.props.index}</div>
        </React.Fragment>
      )
    } else if (this.props.type === PATH.TIL) {
      result = (
        <React.Fragment>
          <div>TIL PAGE</div>
          <div>inde NUM : {this.props.index}</div>
        </React.Fragment>
      )
    }

    return (
      <Container>
      {result}
      <TilInput submitTil={this.submitTil} />
      <SelectBox optionList={this.state.optionList}/>
      {this.renderTilList()}
      </Container>
    );
  }
}

export default MainApp;
