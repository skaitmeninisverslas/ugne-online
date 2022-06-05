import React, { useState } from "react";

import { AddEditPostModal } from "./components/AddEditPostModal";
import { DeletePostModal } from "./components/DeletePostModal";

export const Posts = ({ posts, categories }) => {
  const [modalData, setModalData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPosts, setIsPosts] = useState(false);

  const postsSortedByDescDate = posts.reverse();

  return (
    <div className="w-100">
      <h2 className="text-center">All Posts</h2>

      <button
        className="btn btn-light mt-4"
        onClick={() => {
          setIsAddEditOpen(true);
          setIsPosts(true);
        }}
      >
        <i className="fas fa-plus"></i> New Post
      </button>

      <ul className="mt-4 p-0">
        {postsSortedByDescDate.map((post, key) => {
          const { title, description, _id: id } = post;

          return (
            <li className="card mt-2 p-3" key={key} value={title}>
              <div className="card-body row">
                <div className="col-11">
                  <div className="card-title border-bottom pb-2 font-weight-bold">
                    {title}
                  </div>
                  <div className="card-subtitle text-muted">{description}</div>
                </div>

                <div className="d-flex flex-column ml-auto border-left pl-4">
                  <button
                    onClick={() => {
                      setModalData(post);
                      setIsEdit(true);
                      setIsAddEditOpen(true);
                      setIsPosts(true);
                    }}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-pen"></i>
                  </button>

                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => {
                      setModalData({ id, title });
                      setIsDeleteOpen(true);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {isAddEditOpen && (
        <AddEditPostModal
          categories={categories}
          data={modalData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsAddEditOpen={setIsAddEditOpen}
          isPosts={isPosts}
          setIsPosts={setIsPosts}
        />
      )}

      {isDeleteOpen && (
        <DeletePostModal
          id={modalData.id}
          title={modalData.title}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          isPosts={isPosts}
          setIsPosts={setIsPosts}
        />
      )}
    </div>
  );
};
