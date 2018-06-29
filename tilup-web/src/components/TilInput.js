import React, { Component } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SelectBox from "../components/SelectBox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class TilInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilValue: "Today I Learned...",
      optionList: [
        { text: "Inbox" },
        { text: "JavaScript" },
        { text: "Interview Questions" },
      ]
    };
  }


  render() {
    return (
      <div className="til-card til-input__container">
        <div className="avatar d-sm-block d-none">
          <img src="https://vignette.wikia.nocookie.net/edukayfun/images/0/0b/Soo_soo_ANOYING%21%21%21%21%21%21%21%21%21%21%21%21%21%21.png/revision/latest?cb=20171206164413" />
        </div>
        <div className="til-card__container">
          <div className="til-card__box">
            <div className="til-card__contents">
              <SimpleMDE
                placeholder="test"
                value={this.state.tilValue}
                options={{ spellChecker: false }} />
            </div>
            <div className="tag-container">
              <span>#Bash</span>
            </div>
            <div className="til-card__footer">
              <SelectBox optionList={this.state.optionList}/>
              <div className="right">
                <FormControlLabel control={<Checkbox value="isSecret" />} label="나만 보기" />
                <Button variant="outlined">TIL 게시</Button>
              </div>
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
