import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_MODAL_EDIT } from "../../../store/types";
const ModalAdmin = (props) => {
  const { open, title, ComponentEditDrawer } = useSelector(
    (state) => state.ModalEditReducer
  );
  const dispatch = useDispatch();
  return (
    <>
      {/* <Button
        type="primary"
        onClick={() => {
          dispatch({ type: OPEN_MODAL_EDIT, open: true });
        }}
      >
        Open Modal of 1000px width
      </Button> */}
      <Modal
        title={title}
        centered
        open={open}
        onOk={() => {
          dispatch({ type: CLOSE_MODAL_EDIT, open: false });
        }}
        onCancel={() => {
          dispatch({ type: CLOSE_MODAL_EDIT, open: false });
        }}
        width={1000}
      >
        {ComponentEditDrawer}
      </Modal>
    </>
  );
};
export default ModalAdmin;
