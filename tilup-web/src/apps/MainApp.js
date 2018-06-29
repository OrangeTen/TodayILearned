import React, { Component } from 'react';
import './MainApp.css';
import { PATH } from '../consts/consts';
import TilItem from "../components/TilItem";
import TilInput from "../components/TilInput";
import NavigationBar from "../components/NavigationBar";

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilList: [
        {
          _ID: 1,
          user: {
            name: "오렌지",
          },
          contents: "안녕하세오 오렌지에오",
          hash: [
            "Java",
            "Android",
          ],
          directory: {
            name: "Inbox",
            created: Date.now(),
            updated: Date.now(),
          },
          created: Date.now(),
          updated: Date.now(),
        },
        {
          _ID: 2,
          user: {
            name: "오렌지",
          },
          contents: "안녕히계세오 망고에오",
          hash: [
            "Java",
            "Android",
          ],
          directory: {
            name: "Inbox",
            created: Date.now(),
            updated: Date.now(),
          },
          created: Date.now(),
          updated: Date.now(),
        },
      ],
    }
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
      <div className="MainApp">
        <NavigationBar />
        {result}
        <TilInput />
        {this.renderTilList()}
      </div>
    );
  }
}

export default MainApp;
