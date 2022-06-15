import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";

import {
  bufferImageToString,
  createUrlForLocalImage,
  getFileFromInput,
  trimmedLocalImageUrl,
} from "../helpers/constants";
import { editUser } from "../helpers/apiCalls";
import * as messages from "../messages/forms";
import { isEmpty } from "lodash-es";
import { useUserData } from "../hooks/useUserData";

export const User = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [response, setResponse] = useState();

  const { user, setUpdateData } = useUserData();

  const isLoading = !user || isEmpty(user);

  const handleSubmitForm = (values) => {
    // Create form data
    let form = new FormData();
    // Add data to formData
    Object.entries(values).forEach(([key, value]) => form.append(key, value));

    editUser(form)
      .then((res) => {
        setUpdateData(true);
        setSelectedImage("");
        setResponse(res.data);
      })
      .catch((error) => {
        setResponse(error.response.data);
        setSelectedImage("");
      });
  };

  return (
    <Fragment>
      {!isLoading && (
        <Formik initialValues={user} onSubmit={handleSubmitForm}>
          {({ submitForm, setFieldValue }) => (
            <div className="w-100">
              <h2 className="text-center">User Account</h2>

              <div className="mt-4">
                <div className="modal-header">
                  {user.image && (
                    <img
                      className="rounded-circle"
                      width="75"
                      height="75"
                      src={bufferImageToString(
                        user.image.mimetype,
                        user.image.file.data
                      )}
                      alt=""
                    />
                  )}

                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Edit user account
                  </h5>
                </div>
                <div className="modal-body">
                  <Form>
                    <div className="form-group">
                      <label>Username</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <Field
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                      />
                    </div>

                    {selectedImage && (
                      <img
                        className="rounded-circle d-block mx-auto my-3"
                        width="75"
                        height="75"
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
                  </Form>
                </div>

                {response && (
                  <div id="message" className="FOOTER__information-text mt-0">
                    {messages.forms[response]}
                  </div>
                )}

                <div className="modal-footer">
                  <button className="btn btn-success" onClick={submitForm}>
                    <i className="fas fa-save"></i> Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </Formik>
      )}
    </Fragment>
  );
};
