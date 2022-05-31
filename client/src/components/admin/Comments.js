import React from "react";

export const Comments = ({ comments, posts }) => {
  return (
    <div className="w-100">
      <h2 className="text-center">All Comments</h2>

      <ul className="mt-4 p-0">
        {comments.map((com, key) => (
          <li className="card mt-2 p-3" key={key}>
            <div className="card-body row">
              <div className="col-11">
                <div className="card-title border-bottom pb-2 font-weight-bold">
                  {com.user}
                </div>
                <div className="card-subtitle text-muted">{com.comment}</div>
                {posts
                  .filter((art) => art._id === com.post)
                  .map((art, key) => (
                    <div className="card-subtitle mt-3" key={key}>
                      <strong>Post: </strong>
                      {art.title}
                    </div>
                  ))}
              </div>
              <div className="d-flex flex-column ml-auto border-left pl-4">
                <button
                  data-toggle="modal"
                  data-target={`#delete${com._id}`}
                  className="btn btn-danger mt-2"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div
              className="modal fade"
              id={`delete${com._id}`}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title text-center"
                      id="exampleModalLabel"
                    >
                      Warning!
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Are you sure, do you want to delete comment?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <a
                      type="button"
                      href={`/api/comments/delete/com._id`}
                      className="btn btn-danger"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
