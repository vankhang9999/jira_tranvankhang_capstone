import React from "react";
import ReactHtmlParser from "html-react-parser";

const InfoMain = (props) => {
  const { projectDetail } = props;
  const renderAvatar = () => {
    return projectDetail.members?.map((user, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={user.avatar} alt={user.avater} />
        </div>
      );
    });
  };

  return (
    <>
      <h3>{projectDetail.projectName}</h3>
      <section>{ReactHtmlParser(projectDetail.description)}</section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {/* <div className="avatar">
            <img
              src={require("../../../assets/img/download (1).jpg")}
              alt="cyber"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (2).jpg")}
              alt="cyber"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (3).jpg")}
              alt="cyber"
            />
          </div> */}
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
};

export default InfoMain;
