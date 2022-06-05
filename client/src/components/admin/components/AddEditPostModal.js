import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";

import {
  createPage,
  createPost,
  editPage,
  editPost,
} from "../../helpers/apiCalls";
import { useData } from "../../../DataContext";
import {
  trimmedLocalImageUrl,
  createUrlForLocalImage,
  getFileFromInput,
} from "../../helpers/constants";
import { SeoInputs } from "./SeoInputs";

export const AddEditPostModal = ({
  categories,
  data,
  isEdit,
  setIsEdit,
  setIsAddEditOpen,
  isPosts,
  setIsPosts,
  isPage,
  setIsPage,
}) => {
  const isSeoData = Boolean(
    data &&
      (data.metitle ||
        data.medescription ||
        data.ogimage ||
        data.ogtitle ||
        data.ogdescription)
  );
  const [selectedImage, setSelectedImage] = useState();
  const [selectedOgImage, setSelectedOgImage] = useState();
  const [isSeoNeeded, setIsSeoNeeded] = useState(isSeoData || false);
  const { setUpdateData } = useData();

  const onModalClose = () => {
    setIsEdit(false);
    setIsAddEditOpen(false);
    isPage ? setIsPage(false) : setIsPosts(false);
  };

  const handleSubmitForm = (values) => {
    // Create form data
    let form = new FormData();
    // Add data to formData
    Object.entries(values).forEach(([key, value]) => form.append(key, value));

    isEdit && isPosts
      ? editPost(data._id, form).then(() => {
          setUpdateData(true);
          onModalClose();
        })
      : isEdit && isPage
      ? editPage(data._id, form).then(() => {
          setUpdateData(true);
          onModalClose();
        })
      : isPosts
      ? createPost(form).then(() => {
          setUpdateData(true);
          onModalClose();
        })
      : createPage(form).then(() => {
          setUpdateData(true);
          onModalClose();
        });
  };

  const initialValues = isEdit
    ? data
    : isPosts && categories
    ? { category: categories[0]._id }
    : {};

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ setFieldValue, submitForm, values, setValues }) => {
        const clearSeoFields = () =>
          setValues({
            ...values,
            ogimage: "",
            metitle: "",
            medescription: "",
            ogtitle: "",
            ogdescription: "",
          });

        return (
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
                    {isEdit
                      ? `Edit ${data.title}`
                      : isPosts
                      ? "Create New Post"
                      : "Create New Page"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={onModalClose}
                  >
                    <span>&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  <Form>
                    <div className="form-group">
                      <label>Title</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                      />
                    </div>

                    {isPosts && (
                      <Fragment>
                        <div className="form-group">
                          <label>Category</label>
                          <Field
                            as="select"
                            className="form-control"
                            name="category"
                          >
                            {categories.map((item, key) => (
                              <option key={key} value={item._id}>
                                {item.title}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="form-group">
                          <label>Description</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Description"
                            required
                          />
                        </div>
                      </Fragment>
                    )}

                    {isPage && (
                      <div className="form-group">
                        <label>Subtitle</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="subtitle"
                          placeholder="Subtitle"
                          required
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label>Content</label>
                      <Field
                        as="textarea"
                        className="form-control"
                        name="content"
                        placeholder="Content ..."
                        required
                        cols="30"
                        rows="10"
                      />

                      {isEdit && data.image && (
                        <img
                          src={data.image}
                          className="rounded d-block mx-auto mt-3"
                          width="200"
                          alt=""
                        />
                      )}
                    </div>

                    {selectedImage && (
                      <img
                        className="rounded d-block mx-auto my-3"
                        width="200"
                        src={createUrlForLocalImage(selectedImage)}
                        alt=""
                      />
                    )}

                    <div className={`input-group ${!selectedImage && "mt-3"}`}>
                      <div className="input-group-prepend">
                        <button
                          className="input-group-text"
                          onClick={() =>
                            selectedImage && setSelectedImage(null)
                          }
                        >
                          {selectedImage ? "Remove" : "Upload"}
                        </button>
                      </div>

                      <div className="form-group custom-file">
                        <input
                          className="custom-file-input"
                          required
                          type="file"
                          name="image"
                          onChange={(event) => {
                            setFieldValue("image", getFileFromInput(event));
                            setSelectedImage(getFileFromInput(event));
                          }}
                        />
                        <label
                          className="custom-file-label overflow-hidden"
                          htmlFor="customFile"
                        >
                          {selectedImage
                            ? trimmedLocalImageUrl(selectedImage)
                            : "Choose image"}
                        </label>
                      </div>
                    </div>

                    <div className="form-group form-check mt-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isSeoNeeded}
                        onChange={() => {
                          setIsSeoNeeded(!isSeoNeeded);
                          clearSeoFields();
                        }}
                      />
                      <label className="form-check-label">
                        SEO data needed
                      </label>
                    </div>

                    {/* SEO PART */}
                    {isSeoNeeded && (
                      <SeoInputs
                        selectedOgImage={selectedOgImage}
                        image={data.ogimage}
                        isEdit={isEdit}
                        setSelectedOgImage={setSelectedOgImage}
                        setFieldValue={setFieldValue}
                      />
                    )}
                  </Form>
                </div>
                <div className="modal-footer d-flex justify-content-center">
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
        );
      }}
    </Formik>
  );
};
