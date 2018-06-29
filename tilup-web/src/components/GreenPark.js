import React, { Component } from 'react';
import './GreenPark.css';
//import {getGreenData} from "../actions";

class GreenPark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greenData: []
    }
  }

  componentDidMount() {
    const self = this;
    let greenData = [];
    for (let i=0; i<52; i++) {
      greenData[i] = [];
      for (let j=0; j<7; j++) {
        greenData[i][j] = Math.round(Math.random() * 4)+1;
      }
    }
    this.setState({greenData});

    // getGreenData().then((response)=>{
    //   self.setState({greenData: response.data});
    // });
  }

  render() {
    const greenPark = this.state.greenData.map((col, idx)=>
      (
        <div className={`greenPark__col ${idx<26 ? 'd-none d-md-block' : ''}`}>
          {col.map((depth) => (
            <div className={`greenPark__cell d-${depth}`}></div>
          ))}
        </div>
      ));
    const legendBottom = [1,2,3,4,5].map((depth)=>
      (
        <div className={`legend-bottom-cell greenPark__cell d-${depth}`} />
      ));

    return (
      <div>
        <div className="greenPark__title">{this.props.num} activities in recent</div>
        <div className="greenPark__div">
          <div className="greenPark__wrapper">
            <div className="greenPark">
              <div className="legend">
                <div className="legend-cell"/>
                <div className="legend-cell">Mon</div>
                <div className="legend-cell" />
                <div className="legend-cell">Wed</div>
                <div className="legend-cell" />
                <div className="legend-cell">Fri</div>
                <div className="legend-cell" />
              </div>
              {greenPark}
            </div>
            <div className="legend-bottom">
              <div className="legend-bottom-text">
                Less
              </div>
              {legendBottom}
              <div className="legend-bottom-text">
                More
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GreenPark;
