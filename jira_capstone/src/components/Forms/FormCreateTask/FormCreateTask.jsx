import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Slider, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { quanLyTaskAction } from "../../../store/actions/quanLyTaskActions";
import {
  GET_ALL_SEARCH,
  GET_ALL_USER,
  SET_SUBMIT_CREATE_TASK,
} from "../../../store/types";
const FormCreateTask = () => {
  const dispatch = useDispatch();
  const { projectAll } = useSelector((state) => state.ProjectCategoryReducer);
  const { ArrTask } = useSelector((state) => state.TaskTypeReducer);
  const { ArrPriority } = useSelector((state) => state.PriorityReducer);
  const { userSearch, ArrUser, ArrUserBYId } = useSelector(
    (state) => state.userTaskReducer
  );
  const { ArrStatus } = useSelector((state) => state.StatusReducer);

  const userOption = ArrUserBYId?.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  useEffect(() => {
    dispatch(quanLyTaskAction.getAllTaskTypeAction());
    dispatch(quanLyTaskAction.GetPriorityAll());
    dispatch(quanLyTaskAction.GetAllUser());
    dispatch(quanLyTaskAction.GetAllStatus());
    dispatch({
      type: SET_SUBMIT_CREATE_TASK,
      submitFunction: submitForm,
    });
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    log();
    formik.handleSubmit();
  };
  const editorRef = useRef(null);
  const searchRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      formik.setFieldValue("description", editorRef.current.getContent());
    }
  };
  const handleChange = (value) => {
    formik.setFieldValue("listUserAsign", value);
  };
  const [size, setSize] = useState("large");
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: ArrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectAll[0]?.id,
      typeId: ArrTask[0]?.id,
      priorityId: ArrPriority[0]?.priorityId,
    },
    onSubmit: (values) => {
      console.log("value", values);
      dispatch(quanLyTaskAction.CreateTask(values));
    },
  });

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  return (
    <div className="constainer">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <p>Project</p>
          <select
            className="form-control"
            name="projectId"
            onChange={(e) => {
              let { value } = e.target;
              dispatch(quanLyTaskAction.GetUserByProjectId(value));

              formik.setFieldValue("projectId", e.target.value);
            }}
          >
            {projectAll.map((project, index) => {
              return (
                <option key={index} value={project.id}>
                  {project.projectName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Task name</p>
          <input
            type="text"
            name="taskName"
            className="form-control"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <p>Status</p>
          <select
            name="statusId"
            className="form-control"
            onChange={formik.handleChange}
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
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p>priority</p>
              <select
                name="priorityId"
                className="form-control"
                onChange={(e) => {
                  formik.setFieldValue("priorityId", e.target.value);
                }}
              >
                {ArrPriority?.map((priority, index) => {
                  return (
                    <option key={index} value={priority.priorityId}>
                      {priority.priority}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">
              <p>Task type</p>
              <select
                className="form-control"
                name="typeId"
                onChange={(e) => {
                  formik.setFieldValue("typeId", Number(e.target.value));
                }}
              >
                {ArrTask?.map((task, index) => {
                  return (
                    <option key={index} value={task.id}>
                      {task.taskType}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row mt-1">
            <div className="col-6">
              <p>Assignees</p>
              <Select
                mode="multiple"
                size={size}
                placeholder="Please select user"
                onChange={(values) => {
                  formik.setFieldValue("listUserAsign", values);
                }}
                style={{ width: "100%" }}
                options={userOption}
                onSearch={(value) => {
                  if (searchRef.current) {
                    clearTimeout(searchRef.current);
                  }
                  searchRef.current = setTimeout(() => {
                    dispatch(quanLyTaskAction.GetAllUser(value));
                  }, 300);
                }}
              />
              <div className="row">
                <div className="col-12">
                  <p>originalEstimate</p>
                  <input
                    className="form-control"
                    type="number"
                    name="originalEstimate"
                    min="0"
                    defaultValue="0"
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <p>TimTracking</p>
              <Slider
                defaultValue={30}
                value={timeTracking.timeTrackingSpent}
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
              />
              <div className="row">
                <div className="col-6 text-left font-weight-bold">
                  {timeTracking.timeTrackingSpent} logged
                </div>
                <div className="col-6 text-right font-weight-bold">
                  {timeTracking.timeTrackingRemaining} remaining
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p>Time spent (Hour)</p>
                  <input
                    defaultValue="0"
                    className="form-control"
                    type="number"
                    name="timeTrackingSpent"
                    onChange={(e) => {
                      setTimeTracking({
                        ...timeTracking,
                        timeTrackingSpent: e.target.value,
                      });
                      formik.setFieldValue(
                        "timeTrackingSpent",
                        Number(e.target.value)
                      );
                    }}
                  />
                </div>
                <div className="col-6">
                  <p>Time remaining (Hour)</p>
                  <input
                    defaultValue="0"
                    className="form-control"
                    type="number"
                    name="timeTrackingRemaining"
                    onChange={(e) => {
                      setTimeTracking({
                        ...timeTracking,
                        timeTrackingRemaining: e.target.value,
                      });
                      formik.setFieldValue(
                        "timeTrackingRemaining",
                        Number(e.target.value)
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
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
          />
        </div>
        {/* <button type="submit" onClick={log}>
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default FormCreateTask;
