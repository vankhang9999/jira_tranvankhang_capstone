import React, { useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import ReactHtmlParser from "html-react-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCategoryAction } from "../../store/actions/projectCategoryActions";

const ProjectManagement = (props) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const dispatch = useDispatch();
  const { projectAll } = useSelector((state) => state.ProjectCategoryReducer);
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
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <a className="bg-primary p-2 rounded">
            <EditOutlined className="text-white" />
          </a>
          <a className="bg-danger  p-2 rounded">
            <DeleteOutlined className="text-white" />
          </a>
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
