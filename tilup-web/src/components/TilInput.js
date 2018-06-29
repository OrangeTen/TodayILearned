import React, { Component } from 'react';
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";

export default class TilInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilValue: "",
    };
  }


  render() {
    return (
      <div className="til-card til-input__container">
        <div className="avatar">
          <img src="https://vignette.wikia.nocookie.net/edukayfun/images/0/0b/Soo_soo_ANOYING%21%21%21%21%21%21%21%21%21%21%21%21%21%21.png/revision/latest?cb=20171206164413" />
        </div>
        <div className="til-card__container">
          <div className="til-card__box">
            <div className="til-card__contents">
              <SimpleMDE
                value={this.state.tilValue}
                options={{ spellChecker: false }} />
            </div>
            <div className="tag-container">
              <span>#Bash</span>
            </div>
            <div className="til-card__footer">
              
            </div>
          </div>
        </div>
      </div>
    )
    // return (
    //   <div>
    //     <form>
    //       <TextField
    //         id="multiline-static"
    //         multiline
    //         rows="4"
    //         margin="normal"
    //       />
    //       <Button>submit</Button>
    //     </form>
    //   </div>
    // );
  }
}
