import { isEmpty } from "lodash";
import React, { Fragment, useState } from "react";

import { ACTIONS } from "../actions/actions";
import { createPost, deletePost, editPost } from "../helpers/apiCalls";
import { useCategoriesData } from "../hooks/useCategoriesData";
import { usePostsData } from "../hooks/usePostsData";
import { AddEditPostPageModal } from "./components/modals/AddEditPostPageModal";
import { DeleteModal } from "./components/modals/DeleteModal";

const {
  POSTS: { CREATE_POST, EDIT_POST, DELETE_POST, CURRENT_POST },
} = ACTIONS;

export const Posts = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { categories } = useCategoriesData();
  const { posts, post, dispatch, setUpdateData } = usePostsData();

  const isLoading = !posts || isEmpty(posts) || !categories;

  return (
    <Fragment>
      {!isLoading && (
        <div className="w-100">
          <h2 className="text-center">All Posts</h2>

          <button
            className="btn btn-light mt-4"
            onClick={() => {
              setIsEdit(false);
              setIsAddEditOpen(true);
            }}
          >
            <i className="fas fa-plus"></i> New Post
          </button>

          <ul className="mt-4 p-0">
            {posts.map((item, key) => {
              const { title, description, _id: id } = item;
              const postCategory = categories.find(
                (category) => category._id === item.category
              );

              return (
                <li className="card mt-2 p-3" key={key} value={title}>
                  <div className="card-body row">
                    <div className="col-10">
                      <div className="card-title border-bottom pb-2 font-weight-bold">
                        {title}
                      </div>
                      <div className="card-subtitle text-muted">
                        {description}
                      </div>
                      <div className="card-subtitle mt-3" key={key}>
                        <strong>Category: </strong>
                        {postCategory.title}
                      </div>
                    </div>

                    <div className="d-flex flex-column ml-auto border-left pl-4 col-2">
                      <button
                        onClick={() => {
                          dispatch({
                            type: CURRENT_POST,
                            payload: {
                              post: item,
                            },
                          });
                          setIsEdit(true);
                          setIsAddEditOpen(true);
                        }}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-pen"></i>
                      </button>

                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => {
                          dispatch({
                            type: CURRENT_POST,
                            payload: {
                              post: {
                                id,
                                title: `post: ${title}`,
                              },
                            },
                          });
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
            <AddEditPostPageModal
              categories={categories}
              data={{ content: post, component: "post" }}
              isEdit={isEdit}
              setIsAddEditOpen={setIsAddEditOpen}
              dispatch={dispatch}
              action={isEdit ? EDIT_POST : CREATE_POST}
              call={isEdit ? editPost : createPost}
              setUpdateData={setUpdateData}
            />
          )}

          {isDeleteOpen && (
            <DeleteModal
              id={post.id}
              title={post.title}
              setIsDeleteOpen={setIsDeleteOpen}
              dispatch={dispatch}
              action={DELETE_POST}
              call={deletePost}
              setUpdateData={setUpdateData}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};
