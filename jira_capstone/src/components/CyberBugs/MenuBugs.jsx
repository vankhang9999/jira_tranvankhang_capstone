import React from "react";
import { NavLink } from "react-router-dom";

const MenuBugs = () => {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jpg")} alt="jira" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink
            to="/jirabugs"
            activeClassName="avtive text-success font-weight-bold"
          >
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink
            to="/createproject"
            activeClassName="active text-success font-weight-bold"
          >
            Create Project
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBugs;
