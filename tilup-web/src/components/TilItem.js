import React, { Component } from 'react';
import './til-item.css';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import ReactMarkdown from 'react-markdown';

export default class TilItem extends Component {
  render() {
    const {data} = this.props;
    const avatarUrl = "https://vignette.wikia.nocookie.net/edukayfun/images/0/0b/Soo_soo_ANOYING%21%21%21%21%21%21%21%21%21%21%21%21%21%21.png/revision/latest?cb=20171206164413"
    console.log("틸아이템", data)
    return (
      <div className="til-card">
        <div className="avatar">
          <img src={avatarUrl} />
        </div>
        <div className="til-card__container">
          <div className="name-container">
            <div className="name-container__name">jayjin</div>
            <div className="name-container__date">6월 29일</div>
          </div>
          <div className="til-card__box">
            <div className="til-card__contents">
              <ReactMarkdown source={data.contents} className="til-markdown-container" />
            </div>
            <div className="tag-container">
              <span>#Bash</span>
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
