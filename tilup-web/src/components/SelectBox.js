import React from "react"
import './select-box.css';

export default ({optionList}) => {
  return (
    <div className="til-filter-select">
      <div className="til-filter-select__container" style={{position: "relative"}}>
        <select name="select">
          {
            optionList.map((option, idx) => {
              return <option value="value1" key={idx}>{option.text}</option>
            })
          }
        </select>
        <div className="select__arrow"></div>
      </div>
    </div>
  )
}
