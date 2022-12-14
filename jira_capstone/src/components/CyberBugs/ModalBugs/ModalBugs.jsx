import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import { useEffect } from "react";
import { quanLyTaskAction } from "../../../store/actions/quanLyTaskActions";
import { quanLyProjectService } from "../../../services/quanLyProjectService";
import {
  CHANGE_ASSGNESS,
  CHANGE_TASK_MODAL,
  REMOVE_USER,
} from "../../../store/types";
import { Editor } from "@tinymce/tinymce-react";
import { Formik, useFormik } from "formik";
import { Select } from "antd";

const ModalBugs = (props) => {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { ArrStatus } = useSelector((state) => state.StatusReducer);
  const { ArrPriority } = useSelector((state) => state.PriorityReducer);
  const { ArrTask } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const [visible, setVisible] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(quanLyTaskAction.GetAllStatus());
    dispatch(quanLyTaskAction.GetPriorityAll());
    dispatch(quanLyTaskAction.getAllTaskTypeAction());
  }, []);

  console.log("taskDetailModal", taskDetailModal);
  // const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     description: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log("value", values);
  //   },
  // });
  const renderDescription = () => {
    const jxDescription = parse(`${taskDetailModal.description}`);
    return (
      <div>
        {visible ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-success mr-2 mt-2"
              onClick={() => {
                dispatch({
                  type: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisible(false);
              }}
            >
              SAVE
            </button>
            <button
              className="btn btn-danger mt-2"
              onClick={() => {
                dispatch({
                  type: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                });
                setVisible(false);
              }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisible(!visible);
            }}
          >
            {jxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h estimated
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={handleChange}
              >
                {ArrTask?.map((tp, index) => {
                  return (
                    <option key={index} value={tp.id}>
                      {tp.taskType}
                    </option>
                  );
                })}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">??</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        STORY <i className="fa fa-book-reader" />
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jpg")}
                          alt="cyber1"
                        />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img
                              src={require("../../../assets/img/download (1).jpg")}
                              alt="cyber1"
                            />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>???
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        handleChange(e);
                        //   const action = {
                        //     taskId: taskDetailModal.taskId,
                        //     statusId: e.target.value,
                        //     projectId: taskDetailModal.projectId,
                        //   };
                        //   const id = taskDetailModal.projectId;

                        //   console.log(action);
                        //   dispatch(quanLyTaskAction.UpdateStatusAction(action));
                      }}
                    >
                      {ArrStatus?.map((status, index) => {
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row mt-2 mb-2">
                      {taskDetailModal?.assigness?.map((user, index) => {
                        return (
                          <div className="col-8 mb-2">
                            <div
                              style={{ display: "flex" }}
                              className="item"
                              key={index}
                            >
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-2">
                                {user.name}

                                <span
                                  className="text-danger ml-3"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: REMOVE_USER,
                                      userId: user.id,
                                    });
                                  }}
                                >
                                  X
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-6 mt-2 mb-2">
                        <i className="fa fa-plus" style={{ marginRight: 5 }} />
                        <span>Add more</span>
                        <div>
                          <Select
                            options={projectDetail.members
                              ?.filter((mem) => {
                                let index =
                                  taskDetailModal.assigness?.findIndex(
                                    (us) => us.id === mem.userId
                                  );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              .map((mem, index) => {
                                return { value: mem.userId, label: mem.name };
                              })}
                            optionFilterProp="label"
                            style={{ width: "100%" }}
                            name="lstUser"
                            value="+ Add more"
                            className="form-control"
                            onSelect={(value) => {
                              if (value == "0") {
                                return;
                              }
                              let userSelected = projectDetail.members.find(
                                (mem) => mem.userId == value
                              );
                              userSelected = {
                                ...userSelected,
                                id: userSelected.userId,
                              };
                              dispatch({
                                type: CHANGE_ASSGNESS,
                                userSelected,
                              });
                            }}
                          ></Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {ArrPriority?.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBugs;
