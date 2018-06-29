import React from "react"
import './select-box.css';

export default ({optionList}) => {
  return (
    <div className="til-filter-select">
      <div className="til-filter-select__container" style={{position: "relative"}}>
        <select name="select">
          {
            optionList.map(option => {
              return <option value="value1">{option.text}</option> 
            })
          }
        </select>
        <div class="select__arrow"></div>
      </div>
    </div>
  )
}
