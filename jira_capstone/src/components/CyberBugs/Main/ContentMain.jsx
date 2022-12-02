import React from "react";
import { useDispatch } from "react-redux";
import { quanLyTaskAction } from "../../../store/actions/quanLyTaskActions";
const ContentMain = (props) => {
  const { projectDetail } = props;
  const dispatch = useDispatch();
  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((tastListDetail, index) => {
      return (
        <div
          key={index}
          className="card pb-2"
          style={{ width: "17rem", height: "auto" }}
        >
          <div className="card-header">{tastListDetail.statusName}</div>
          <ul className="list-group list-group-flush">
            {tastListDetail.lstTaskDeTail.map((task, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(quanLyTaskAction.GetTaskDetailAction(task.taskId));
                  }}
                >
                  <p className="font-weight-bold">{task.taskName}</p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      <p className="text-success">
                        {task.priorityTask.priority}
                      </p>
                      {/* <i className="fa fa-bookmark" />
                      <i className="fa fa-arrow-up" /> */}
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        {task.assigness.map((mem, index) => {
                          return (
                            <div className="avatar" key={index}>
                              <img src={mem.avatar} alt={mem.avatar} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* <li className="list-group-item">
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-check-square" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
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
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">Vestibulum at eros</li> */}
          </ul>
        </div>
      );
    });
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
};

export default ContentMain;

{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">IN PROGRESS 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">DONE 3</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */
}
