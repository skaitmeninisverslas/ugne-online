import React from "react";

export const Subscribers = ({ subscribers }) => {
  return (
    <div className="w-100">
      <h2 className="text-center">Subscribers</h2>

      <ul className="list-group text-center mt-3">
        {subscribers.map((item, key) => (
          <li key={key} className="list-group-item">
            {`${item.email} `}

            <button
              className="btn btn-danger float-right"
              data-toggle="modal"
              data-target={`#delete${item._id}`}
            >
              <i className="fas fa-trash"></i>
            </button>

            <div
              className="modal fade"
              id={`delete${item._id}`}
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
                    Are you sure, do you want to delete subscriber:
                    {item.email}
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
                      href={`/api/subscribers/delete/${item._id}`}
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
