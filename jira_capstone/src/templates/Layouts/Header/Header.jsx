import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
const Header = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img src="https://i.imgur.com/lC22izJ.png" alt="cybersoftlogo" />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="jirabugs">
                Jirabugs <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-success" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item  text-success" to="/home">
                  Home
                </NavLink>
                <div className="dropdown-divider" />
                <a className="dropdown-item  text-success" href="#">
                  Profile
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item  text-success" href="#">
                  Login
                </a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn bg-dark btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn  bg-dark ml-2 btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => {
                history.push("/register");
              }}
            >
              Register
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
