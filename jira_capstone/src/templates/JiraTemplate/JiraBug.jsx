import React, { useEffect } from "react";
import ContentMain from "../../components/CyberBugs/Main/ContentMain";
import HeaderMain from "../../components/CyberBugs/Main/HeaderMain";
import InfoMain from "../../components/CyberBugs/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { PUT_PROJECT_DETAIL } from "../../store/types";
import { quanLyNguoiDungAction } from "../../store/actions/quanLyNguoiDungActions";

const JiraBug = (props) => {
  let { projectDetail } = useSelector((state) => state.projectReducer);
  console.log("project", projectDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch(quanLyNguoiDungAction.getProjectDetail(projectId));
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
};

export default JiraBug;
