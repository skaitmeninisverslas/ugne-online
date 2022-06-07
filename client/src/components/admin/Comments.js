import React, { useState } from "react";
import { DeleteModal } from "./components/modals/DeleteModal";

export const Comments = ({ comments, posts }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [modalData, setModalData] = useState();

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
                  className="btn btn-danger mt-2"
                  onClick={() => {
                    setModalData({ id: com._id, title: com.comment });
                    setIsDeleteOpen(true);
                    setIsComment(true);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isDeleteOpen && (
        <DeleteModal
          id={modalData.id}
          title={modalData.title}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          isComment={isComment}
          setIsComment={setIsComment}
        />
      )}
    </div>
  );
};
