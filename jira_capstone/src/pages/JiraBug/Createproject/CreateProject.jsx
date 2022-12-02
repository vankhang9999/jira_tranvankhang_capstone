import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCategoryAction } from "../../../store/actions/projectCategoryActions";
import { useForm } from "react-hook-form";
const CreateProject = (props) => {
  const { arrProjectCategory } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  // console.log("arr", arrProjectCategory);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProjectCategoryAction.getProjectCategoryAction());
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      categoryId: arrProjectCategory[0]?.id,
      alias: "",
    },
  });
  const editorRef = useRef(null);
  const log = () => {
    //lấy giá trị từ editor
    if (editorRef.current) {
      setValue("description", editorRef.current.getContent());
    }
  };
  const onSubmit = (data) => {
    dispatch(ProjectCategoryAction.createProjectJiraAction(data));
  };

  return (
    <div className="container">
      <h3>CreateProJect</h3>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <p>Name</p>
          <input
            type="text"
            className="form-control"
            name="projectName"
            {...register("projectName")}
          />
        </div>
        <div className="form-group">
          <p>Description</p>
          <>
            <Editor
              name="description"
              {...register("description")}
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
          </>
        </div>
        <div className="form-group">
          <select
            name="categoryId"
            {...register("categoryId")}
            className="form-control"
            onChange={(e) => {}}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-success" onClick={log} type="submit">
          Create project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
