import React, { Component } from 'react';
import './select-box.css';

class SelectBox extends Component {
  render()
  {
    return (
      <div className="til-filter-select">
        <div className="til-filter-select__container" style={{position: "relative"}}>
          <select name="select">
            {
              this.props.optionList.map((option, idx) => {
                return <option value="value1" key={idx}>{option.text}</option>
              })
            }
          </select>
          <div className="select__arrow"></div>
        </div>
      </div>
    );
  }
}

export default SelectBox;
