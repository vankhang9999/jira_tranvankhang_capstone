import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCategoryAction } from "../../../store/actions/projectCategoryActions";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../store/types";
import { ProjectAPIAction } from "../../../store/actions/projectAPIActions";

const FormEditProject = () => {
  const { arrProjectCategory } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  // console.log("arr", arrProjectCategory);
  const dispatch = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();
    log();
    formik.handleSubmit();
  };

  const { projectEdit } = useSelector((state) => state.projectReducer);
  console.log(projectEdit);
  //componentdidmount
  useEffect(() => {
    //goi api
    dispatch(ProjectCategoryAction.getProjectCategoryAction());
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT,
      submitFunction: submitForm,
    });
  }, []);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      formik.setFieldValue("description", editorRef.current.getContent());
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      creator: projectEdit.creator?.id,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      const action = ProjectAPIAction.UpdateProjectAction(values, values.id);
      dispatch(action);
    },
  });
  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              className="form-control"
              name="id"
              onChange={formik.handleChange}
              value={formik.values.id}
              disabled
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={formik.values.projectName}
              className="form-control"
              name="projectName"
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              onChange={formik.handleChange}
              className="form-control"
              name="categoryId"
              value={formik.values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">description</p>
            <>
              <Editor
                name="description"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={formik.values.description}
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
            </>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormEditProject;
