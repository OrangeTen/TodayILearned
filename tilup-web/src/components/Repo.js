import React, { Component } from 'react';
import './Repo.css';

class Repo extends Component {
  render() {
    const color_num = Math.round(Math.random()*3)+1;
    return (
      <div className="Repo">
        <div className="Repo__title">
          Orange10
        </div>
        <div className="Repo__desc">
          오렌지텐 프로젝트
        </div>
        <div className="Repo__tag">
          <span className={`Repo__dot color-${color_num}`} />
          Javascript
        </div>
      </div>
    );
  }
}

export default Repo;
