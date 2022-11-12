import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const CreateProject = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="container">
      <h3>CreateProJect</h3>
      <div className="container">
        <div className="form-group">
          <p>Name</p>
          <input type="text" className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <input type="text" className="form-control" name="projectName" />
          <>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
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
            <button onClick={log}>Log editor content</button>
          </>
        </div>
        <div className="form-group">
          <select name="categoryId" className="form-control">
            <option>Software</option>
            <option>Web</option>
            <option>App</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
