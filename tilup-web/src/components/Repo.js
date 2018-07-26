import React, { Component } from 'react';

import './Repo.css';
import { dateHumanize } from "../utils/humanize";

class Repo extends Component {
  render() {
    const color_num = this.props.index % 4 + 1;

    return (
      <div className="Repo">
        <div className="Repo__title">
          <span className={`Repo__dot color-${color_num}`} />
          { this.props.data.name }
        </div>
        <div className="Repo__desc">
        </div>
        <div className="Repo__tag">
          { dateHumanize(this.props.data.created) }
        </div>
      </div>
    );
  }
}

export default Repo;
