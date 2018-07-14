import React, { Component } from 'react';
import './til-item.css';
import Icon from '@material-ui/core/Icon';
import ReactMarkdown from 'react-markdown';

export default class TilItem extends Component {
  getHashes() {
    const { data } = this.props;

    return data.hash.map((eachHash) => (
      <span>#{eachHash} </span>
    ));
  }

  dateHumanize(rawDate) {
    let date = new Date(rawDate);

    return date.toLocaleString("ko-KR");
  }

  render() {
    const { data } = this.props;
    const avatarUrl = "https://vignette.wikia.nocookie.net/edukayfun/images/0/0b/Soo_soo_ANOYING%21%21%21%21%21%21%21%21%21%21%21%21%21%21.png/revision/latest?cb=20171206164413";

    return (
      <div className="til-card">
        <div className="avatar d-sm-block d-none">
          <img src={avatarUrl} />
        </div>
        <div className="til-card__container">
          <div className="name-container">
            <img src={avatarUrl} className="avatar-mobile d-sm-none" />
            <div className="name-container__name">{ data.uid ? data.uid.substr(0, 8) : "비회원"}</div>
            <div className="name-container__date">{ this.dateHumanize(data.created) }</div>
          </div>
          <div className="til-card__box">
            <div className="til-card__contents">
              <ReactMarkdown
                className="til-markdown-container"
                source={data.contents} />
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
    // return (
    //   <Card>
    //     <CardContent>
    //       {this.props.data.contents}
    //     </CardContent>
    //     <CardActions>
    //       <Button size="small">button</Button>
    //     </CardActions>
    //   </Card>
    // );
  }
}
