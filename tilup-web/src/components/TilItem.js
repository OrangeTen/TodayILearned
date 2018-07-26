import React, { Component } from 'react';
import { connect } from "react-redux";
import Icon from '@material-ui/core/Icon';
import ReactMarkdown from 'react-markdown';

import './til-item.css';
import { dateHumanize } from "../utils/humanize";


class TilItem extends Component {
  getHashes() {
    const { data } = this.props;

    return data.hash.map((eachHash) => (
      <span>#{eachHash} </span>
    ));
  }

  render() {
    const { data } = this.props;

    let name = "";
    let profileUrl = "";
    if (!data.uid) {
      profileUrl = "https://vignette.wikia.nocookie.net/edukayfun/images/0/0b/Soo_soo_ANOYING%21%21%21%21%21%21%21%21%21%21%21%21%21%21.png/revision/latest?cb=20171206164413";
      name = "비회원";
    } else if (typeof(data.uid) === "object") {
      profileUrl = data.uid.profileUrl;
      name = data.uid.name;

      // TODO 180726 jyp : Fix to populate uid on response of posting til and Remove
    } else if (typeof(data.uid) === "string") {
      profileUrl = this.props.user.photoURL;
      name = this.props.user.displayName;
    }

    const humanizedDate = dateHumanize(data.created);

    return (
      <div className="til-card">
        <div className="avatar d-sm-block d-none">
          <img src={ profileUrl } alt="avatarImage" />
        </div>
        <div className="til-card__container">
          <div className="name-container">
            <img src={ profileUrl } alt="avatarPhoto" className="avatar-mobile d-sm-none" />
            <div className="name-container__name">{ name }</div>
            <div className="name-container__date">{ humanizedDate }</div>
          </div>
          <div className="til-card__box">
            <div className="til-card__contents">
              <ReactMarkdown
                className="til-markdown-container"
                source={ data.contents } />
            </div>
            <div className="tag-container">
              { this.getHashes() }
            </div>
            <div className="til-card__footer">
              <Icon>link</Icon>
              <span className="til__forked">
                <Icon>timeline</Icon>
                13
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
  };
}

export default connect(mapStateToProps)(TilItem);
