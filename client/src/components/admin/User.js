import React from "react";

export const User = ({ user }) => {
  return (
    <div className="w-100">
      <h2 className="text-center">User Account</h2>

      <form
        className="mt-4"
        action={`/api/user/edit`}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="modal-header">
          <img
            className="rounded-circle"
            width="75"
            height="75"
            src={user.image}
            alt=""
          />
          <h5 className="modal-title text-center" id="exampleModalLabel">
            Edit user account
          </h5>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="username"
              defaultValue={user.username}
              placeholder="Title"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              defaultValue={user.email}
              placeholder="Title"
            />
          </div>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="form-group custom-file">
              <input
                className="custom-file-input"
                type="file"
                id="customFile"
                name="image"
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose image
              </label>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" type="submit">
            <i className="fas fa-save"></i> Post
          </button>
        </div>
      </form>
    </div>
  );
};
