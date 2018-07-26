import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import './ProfileApp.css';
import Profile from '../components/Profile';
import GreenPark from "../components/GreenPark";
import Repo from "../components/Repo";
import { fetchDirectoryList, createDirectory } from "../actions/directory";
import Loading from "../components/Loading";

class ProfileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRepoInput: false,
      newRepoName: ''
    };
    this.createRepo = this.createRepo.bind(this);
  }

  componentDidMount() {
    this.props.fetchDirectoryList();
  }

  renderRepoList() {
    let repos = "";
    if (this.props.isFetchingList) {
      repos = <Loading />
    } else {
      repos = this.props.directoryList.map((repoItem, idx) =>
        <Repo data={repoItem}
              key={idx}
              index={idx} />);
    }

    return repos;
  }

  createRepo() {
    this.props.createDirectory(this.state.newRepoName);
  }

  render() {
    const repos = this.renderRepoList();

    return (
      <div className="ProfileApp">
        <div className="ProfileApp__body container">
          <div className="profile">
            { this.props.user ?
              <Profile
                img={this.props.user.photoURL}
                name={this.props.user.displayName}
                id={this.props.user.email}
              /> : '' }
          </div>
          <div className="contents">
            <div className="repos">
              <div className="repos__header mb-2">
                <div className="repos__title">
                  Your Repositories
                </div>
                {this.state.showRepoInput ? (
                  <div className="repos__new__input input-group input-group-sm">
                    <input type="text" className="form-control" placeholder="Hello World!" onChange={e=>this.setState({newRepoName: e.target.value})} value={this.state.newRepoName} />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" onClick={this.createRepo}>Create</button>
                      <button className="btn btn-outline-danger" type="button" onClick={()=>this.setState({showRepoInput: false})}>X</button>
                    </div>
                  </div>
                ) : (
                  <span className="repos__new btn btn-success btn-sm" onClick={()=>this.setState({showRepoInput: true})}>
                    New Repository
                  </span>
                )}
              </div>
              { repos }
            </div>
            <GreenPark />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchDirectoryList,
  createDirectory
};

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
    directoryList: state.directory.directoryList,
    isFetchingList: state.directory.isFetchingList,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileApp);
