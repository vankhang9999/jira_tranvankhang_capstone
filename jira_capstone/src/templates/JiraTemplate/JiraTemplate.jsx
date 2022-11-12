import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ContentMain from "../../components/CyberBugs/Main/ContentMain";
import HeaderMain from "../../components/CyberBugs/Main/HeaderMain";
import InfoMain from "../../components/CyberBugs/Main/InfoMain";
import MenuBugs from "../../components/CyberBugs/MenuBugs";
import ModalBugs from "../../components/CyberBugs/ModalBugs/ModalBugs";
import SidebarBugs from "../../components/CyberBugs/SidebarBugs";
import "../../index.css";
const JiraTemplate = (props) => {
  let { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div className="jira">
              <SidebarBugs />
              <MenuBugs />
              <Component {...propsRoute} />
              <ModalBugs />
            </div>

            {/* <Component {...propsRoute} /> */}
          </Fragment>
        );
      }}
    />
  );
};

export default JiraTemplate;
