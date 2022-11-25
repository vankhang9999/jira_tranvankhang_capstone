import React, { useRef, useState } from "react";
import { AutoComplete, Avatar, Button, Popover, Space, Table, Tag } from "antd";
import ReactHtmlParser from "html-react-parser";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCategoryAction } from "../../store/actions/projectCategoryActions";
import {
  DELETE_PROJECT,
  EIDT_PROJECT,
  OPEN_DRAWER,
  OPEN_FORM,
} from "../../store/types";
import FormEditProject from "../../components/Forms/FormEditProject/FormEditProject";
import { ProjectAPIAction } from "../../store/actions/projectAPIActions";
import { quanLyNguoiDungAction } from "../../store/actions/quanLyNguoiDungActions";
import { NavLink } from "react-router-dom";

const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};
const ProjectManagement = (props) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const dispatch = useDispatch();
  const { projectAll } = useSelector((state) => state.ProjectCategoryReducer);
  const { userSearch } = useSelector((state) => state.userReducer);

  const [value, setValue] = useState("");
  const searchRef = useRef(null);

  const data = projectAll;
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  useEffect(() => {
    dispatch(ProjectCategoryAction.GetProjectAllAction());
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => {
        return a.id - b.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
      sorter: (a, b) => {
        let projectName1 = a.projectName?.trim().toLowerCase();
        let projectName2 = a.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = ReactHtmlParser(text);
    //     return <div key={index}>{jsxContent}</div>;
    //   },
    // },
    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => {
        let categoryName1 = a.categoryName?.trim().toLowerCase();
        let categoryName2 = a.categoryName?.trim().toLowerCase();
        if (categoryName1 < categoryName2) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "creator",
      // dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{text.creator.name}</Tag>;
      },
      sorter: (a, b) => {
        let creator1 = a.creator.name?.trim().toLowerCase();
        let creator2 = a.creator.name?.trim().toLowerCase();
        if (creator1 < creator2) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: "15px" }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    className="btn btn-danger rounded-circle"
                                    onClick={() => {
                                      const user = {
                                        projectId: record.id,
                                        userId: item.userId,
                                      };
                                      dispatch(
                                        ProjectAPIAction.RemoveUserFromProject(
                                          user
                                        )
                                      );
                                    }}
                                  >
                                    <CloseOutlined />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />;
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="topLeft"
              title="Title"
              content={
                <AutoComplete
                  options={userSearch?.map((user, index) => {
                    return { label: user.name, value: user.userId.toString() };
                  })}
                  value={value}
                  onChange={(text) => {
                    setValue(text);
                  }}
                  onSelect={(value, option) => {
                    //set giatri cua hopthoai
                    setValue(option.label);
                    const user = {
                      projectId: record.id,
                      userId: option.value,
                    };
                    dispatch(ProjectAPIAction.AssignUserProjectAction(user));
                  }}
                  style={{ width: "100%" }}
                  onSearch={(value) => {
                    if (searchRef.current) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch(quanLyNguoiDungAction.getUserAction(value));
                    }, 300);
                  }}
                />
              }
              trigger="click"
            >
              <Button className="rounded-circle">+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <a
            className="bg-primary p-2 rounded"
            onClick={() => {
              const action = {
                type: OPEN_FORM,
                title: "Edit project",
                Component: <FormEditProject />,
              };
              //dispatch lên reducer nội dung drawer
              dispatch(action);
              //dispatch data current on reducer
              const actionEditProjet = {
                type: EIDT_PROJECT,
                projectEditModel: record,
              };
              dispatch(actionEditProjet);
            }}
          >
            <EditOutlined className="text-white" />
          </a>

          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch(ProjectAPIAction.DeleteProjectAction(record.id));
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a className="bg-danger  p-2 rounded">
              <DeleteOutlined className="text-white" />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <h3 className="mt-5">Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProjectManagement;
