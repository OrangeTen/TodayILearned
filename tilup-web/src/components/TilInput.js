import React, { Component } from 'react';
import { connect } from "react-redux";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";

import SelectBox from "../components/SelectBox";
import {
  createTil,
  onTilContentsChanged
} from "../actions/til";


class TilInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.createTil(
      this.props.contents, this.props.directory,
      this.props.isPrivate, this.props.hashes
    );
  }

  render() {
    console.log(this.props.contents);

    return (
      <div className="til-card til-input__container">
        <div className="avatar d-sm-block d-none">
          <img src={this.props.user.photoURL} alt="avatar" />
        </div>
        <div className="til-card__container">
          <div className="til-card__box">
            <div className="til-card__contents">
              <SimpleMDE
                label="MarkdownEditor"
                value={this.props.contents}
                onChange={value => this.props.onTilContentsChanged(value)}
                options={{
                  placeholder: "Today I Learned...",
                  spellChecker: false,
                }} />
            </div>
            <div className="tag-container">
              <span>#Bash</span>
            </div>
            <div className="til-card__footer">
              <SelectBox optionList={this.props.directorieList}/>
              <div className="right">
                <FormControlLabel
                  control={<Checkbox value="isSecret" />} label="나만 보기" />
                <Button variant="outlined"
                        disabled={this.props.isCreating}
                        onClick={this.onSubmit}>
                  TIL 게시
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createTil,
  onTilContentsChanged,
};

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
    contents: state.til.contents,
    directorieList: state.til.directorieList,
    isPrivate: state.til.isPrivate,
    directory: state.til.directory,
    hashes: state.til.hashes,
    isCreating: state.til.isCreating,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TilInput);
