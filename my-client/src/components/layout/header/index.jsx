import React from "react";
import "./style.css";
import logo from "./logo.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="" />
      <ul className="nav">
        <li className="nav-bar">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-bar">
          <NavLink className="nav-link" to="/all-students">
            Students
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
