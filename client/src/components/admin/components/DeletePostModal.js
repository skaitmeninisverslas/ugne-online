import React from "react";

import { useData } from "../../../DataContext";
import { deletePage, deletePost } from "../../helpers/apiCalls";

export const DeletePostModal = ({
  id,
  title,
  setIsDeleteOpen,
  isPage,
  setIsPage,
  isPosts,
  setIsPosts,
}) => {
  const { setUpdateData } = useData();

  const handleSubmitForm = () => {
    isPage
      ? deletePage(id).then(() => {
          setIsDeleteOpen(false);
          setUpdateData(true);
          setIsPage(false);
        })
      : deletePost(id).then(() => {
          setIsDeleteOpen(false);
          setUpdateData(true);
        });
  };

  return (
    id &&
    title && (
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
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ background: "#FFF1F1", borderLeft: "5px solid #DC3545" }}
            >
              <h5
                className="modal-title text-center"
                style={{ color: "#DC3545" }}
                id="exampleModalLabel"
              >
                <i
                  className="fas fa-exclamation-circle"
                  style={{ color: "#DC3545" }}
                ></i>{" "}
                Warning!
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setIsDeleteOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure, do you want to delete {isPage ? "page" : "post"}:
              {title}
            </div>
            <div className="modal-footer text-center d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <a
                type="button"
                onClick={handleSubmitForm}
                className="btn btn-danger"
              >
                <i className="fas fa-trash"></i> Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
