import React from "react";

export const Menu = ({ menu }) => {
  return (
    <div className="w-100">
      <h2 className="text-center">Menu information</h2>

      <form
        className="mt-4"
        action={`/api/menu/edit/${menu[0]._id}`}
        key={menu[0]._id}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="modal-header">
          <img
            className="rounded-circle"
            width="75"
            height="75"
            src={menu[0].image}
            alt=""
          />
          <h5 className="modal-title text-center" id="exampleModalLabel">
            Edit menu information
          </h5>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              defaultValue={menu[0].title}
              placeholder="Title"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              defaultValue={menu[0].email}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label>Sidebar description</label>
            <input
              className="form-control"
              type="sidebar"
              name="sidebar"
              defaultValue={menu[0].sidebar}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label>Facebook</label>
            <input
              className="form-control"
              type="url"
              name="facebook"
              defaultValue={menu[0].socials.facebook}
              placeholder="Facebook URL"
            />
          </div>

          <div className="form-group">
            <label>Instagram</label>
            <input
              className="form-control"
              type="url"
              name="instagram"
              defaultValue={menu[0].socials.instagram}
              placeholder="Instagram URL"
            />
          </div>

          <div className="form-group">
            <label>About</label>
            <textarea
              className="form-control"
              name="about"
              defaultValue={menu[0].about}
              placeholder="Content ..."
              cols="30"
              rows="10"
            ></textarea>
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
