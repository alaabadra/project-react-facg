import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import getData from "../../utils/getData";
import { addStudent, getStudent } from "../../utils/localStorageData";

class Student extends Component {
  state = {
    student: {},
    error: null
  };
  componentDidMount() {
    const username = this.props.username;
    const studentLocalStorage = JSON.parse(getStudent(username));
    if (studentLocalStorage) {
      this.setState({ student: studentLocalStorage });
      return;
    }
    const url = `https://api.github.com/users/${username}`;
    getData(url)
      .then(result => {
        const error = result.error;
        if (error) {
          this.setState({ error });
        } else {
          const studentInfo = {
            name: result.name,
            bio: result.bio,
            followers: result.followers,
            following: result.following,
            img: result.avatar_url,
            repoUrl: result.repos_url
          };
          this.setState({
            student: studentInfo
          });
          addStudent(username, studentInfo);
        }
      })
      .catch(error => {
        this.setState({ error: "There is error please refresh the page" });
      });
  }
  render() {
    if (!this.state.student) {
      return <div>Loading ...</div>;
    }
    const error = this.state.error;
    if (error) {
      return (
        <div className="container">
          <p>{error}</p>
        </div>
      );
    }
    const { name, img } = this.state.student;
    return (
      <div className="container">
        <img className="container__img" src={img} alt="pict" />
        <p className="container_username">
          {" "}
          {name ? name : this.props.username}
        </p>
        <Link
          to={`/all-students/${this.props.username}`}
          className="container__link"
        >
          View
        </Link>
      </div>
    );
  }
}
Student.propTypes = {
  username: PropTypes.string.isRequired
};

export default Student;
