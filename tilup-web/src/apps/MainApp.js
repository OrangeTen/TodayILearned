import React, { Component } from 'react';
import './MainApp.css';
import Container from './Container';
import { PATH } from '../consts/consts';
import TilItem from "../components/TilItem";
import TilInput from "../components/TilInput";
import SelectBox from "../components/SelectBox";
import NavigationBar from "../components/NavigationBar";
import {getTilList} from "../actions";

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
  };

  componentDidMount() {
    const self = this;
    getTilList().then((response)=>{
      self.setState({tilList: response.data});
    });
  }

  renderTilList() {
    console.log(this.state.tilList);
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
    console.log(this.state.tilList);
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
      <TilInput />
      <SelectBox optionList={this.state.optionList}/>
      {this.renderTilList()}
      </Container>
    );
  }
}

export default MainApp;
