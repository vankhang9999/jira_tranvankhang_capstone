import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  BarsOutlined,
  PlusOutlined,
  SearchOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;
const SidebarBugs = () => {
  const [state, setState] = useState({
    collapsed: false,
  });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div
          className="text-right text-light pr-2 "
          style={{ fontSize: "20px" }}
          onClick={toggle}
        >
          <BarsOutlined />
        </div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <PlusOutlined style={{ fontSize: "25px", color: "white" }} />
              ),
              label: "Create issue",
            },
            {
              key: "2",
              icon: (
                <SearchOutlined style={{ fontSize: "25px", color: "white" }} />
              ),
              label: "Search",
            },
          ]}
        />
      </Sider>
      {/* <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        {React.createElement(
          state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setState.collapsed(!state.collapsed),
          }
        )}
      </Header> */}
    </div>
  );
};

export default SidebarBugs;
