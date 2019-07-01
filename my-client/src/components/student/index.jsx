import React, { Component } from "react";

import getData from "../../utils/getData";
import Repo from "./Repo";
import { getStudent } from "../../utils/localStorageData";
import "./style.css";

export default class Index extends Component {
  state = {
    name: null,
    repos: null,
    following: 0,
    followers: 0,
    bio: null,
    img: null,
    error: null
  };

  isStudent = () => {
    const username = this.props.match.params.username;
    const students = JSON.parse(getStudent("students"));
    let isStudent = false;
    students.forEach(element => {
      if (element.username === username) isStudent = true;
    });
    if (!isStudent) {
      this.setState({ error: `${username} is not a student in facg6` });
    }
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    const studentInfo = JSON.parse(getStudent(username));
    if (studentInfo) {
      this.setState({
        name: studentInfo.name,
        bio: studentInfo.bio,
        followers: studentInfo.followers,
        following: studentInfo.following,
        img: studentInfo.img
      });
      getData(studentInfo.repoUrl)
        .then(result => {
          const repos = result.map(repo => {
            return { name: repo.name, link: repo.html_url };
          });
          this.setState({ repos: [...repos] });
        })
        .catch(error => {
          this.setState({ error: "There is error please refresh the page" });
        });
        return ;
    }
    getData(`https://api.github.com/users/${username}`)
      .then(result => {
        const error = result.error;
        if (error) {
          this.setState({ error });
        } else {
          this.setState({
            name: result.name,
            bio: result.bio,
            followers: result.followers,
            following: result.following,
            img: result.avatar_url
          });
          return getData(result.repos_url);
        }
      })
      .then(result => {
        const repos = result.map(repo => {
          return { name: repo.name, link: repo.html_url };
        });
        this.setState({ repos: [...repos] });
      })
      .catch(error => {
        this.setState({ error: "There is error please refresh the page" });
      });
  }
  render() {
    this.isStudent();
    const error = this.state.error;
    if (error) {
      return (
        <main className="main">
          <p>{error}</p>
        </main>
      );
    }
    const { name, img, followers, following, bio, repos } = this.state;
    return (
      <main className="main-students">
        <section className="main__info">
          <img src={img} className="main__info-img" alt="pict" />
          <p className="main__info-username">
            {this.props.match.params.username}
          </p>
          {name && <p className="main__info-name">{name}</p>}
          <p className="main__info-bio">bio : {bio}</p>
          <p className="main__info-following">following : {following}</p>
          <p className="main__info-followers">Followers : {followers}</p>
        </section>
        <section className="main__repos">
          <p className="main__repos-title">Repositories : </p>
          <ol className="main__repos-link">
            {this.state.repos
              ? repos.map((repo, index) => <Repo key={index} details={repo} />)
              : "Loading ..."}
          </ol>
        </section>
      </main>
    );
  }
}
