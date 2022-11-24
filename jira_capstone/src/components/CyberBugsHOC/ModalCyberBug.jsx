import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER, OPEN_DRAWER } from "../../store/types";
const { Option } = Select;
const ModalCyberBug = (props) => {
  const { open, ComponentContentDrawer, callBackSubmit } = useSelector(
    (state) => state.DrawerReducer
  );
  const dispatch = useDispatch();
  console.log("open", open);
  const showDrawer = () => {
    dispatch({ type: OPEN_DRAWER });
  };
  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <>
      <button onClick={showDrawer}>ShowDrawe</button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: "8px" }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {/*NỘi dung thay đổi của drawer*/}
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
};

export default ModalCyberBug;
