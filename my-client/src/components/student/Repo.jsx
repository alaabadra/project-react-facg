import React from "react";
import PropTypes from "prop-types";

function Repo(props) {
  const { name, link } = props.details;
  return (
    <li>
      {name} : <a href={link}> {link} </a>
    </li>
  );
}
Repo.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string
  }).isRequired
};

export default Repo;
