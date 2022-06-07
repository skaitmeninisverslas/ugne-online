import React from "react";
import { Formik, Form, Field } from "formik";

import { useData } from "../../../../DataContext";
import { createCategory, editCategory } from "../../../helpers/apiCalls";

export const AddEditCategoryModal = ({
  data,
  setIsAddEditOpen,
  isEdit,
  setIsEdit,
}) => {
  const { setUpdateData } = useData();

  const onModalClose = () => {
    setIsEdit(false);
    setIsAddEditOpen(false);
  };

  const handleSubmitForm = (values) => {
    isEdit
      ? editCategory(values._id, values).then(() => {
          setUpdateData(true);
          onModalClose();
        })
      : createCategory(values).then(() => {
          setUpdateData(true);
          onModalClose();
        });
  };

  const initialValues = isEdit ? data : {};

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ submitForm }) => (
        <div
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "fixed",
            overflowY: "scroll",
            overflowX: "hidden",
            backdropFilter: "blur(0.375rem)",
            backgroundColor: "rgba(247,249,252, 0.9)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">
                  {isEdit ? `Edit category: ${data.title}` : "Create category"}
                </h5>
                <button type="button" className="close" onClick={onModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Form>
                  <div className="form-group">
                    <label>Category title</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="title"
                      placeholder="Title"
                      required
                    />
                  </div>
                </Form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onModalClose}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={submitForm}
                >
                  <i className="fas fa-save"></i>
                  {isEdit ? " Save" : " Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
