import { isEmpty } from "lodash-es";
import React, { Fragment, useState } from "react";

import { ACTIONS } from "../actions/actions";
import { deleteComment } from "../helpers/apiCalls";
import { useCommentsData } from "../hooks/useCommentsData";
import { usePostsData } from "../hooks/usePostsData";
import { DeleteModal } from "./components/modals/DeleteModal";

const {
  COMMENTS: { DELETE_COMMENT, CURRENT_COMMENT },
} = ACTIONS;

export const Comments = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { posts } = usePostsData();
  const { comments, comment, dispatch, setUpdateData } = useCommentsData();

  const isLoading = !comments || isEmpty(comments) || !posts;

  return (
    <Fragment>
      {!isLoading && (
        <div className="w-100">
          <h2 className="text-center">All Comments</h2>

          <ul className="mt-4 p-0">
            {comments.map((item, key) => (
              <li className="card mt-2 p-3" key={key}>
                <div className="card-body row">
                  <div className="col-11">
                    <div className="card-title border-bottom pb-2 font-weight-bold">
                      {item.user}
                    </div>
                    <div className="card-subtitle text-muted">
                      {item.comment}
                    </div>
                    {posts
                      .filter((art) => art._id === item.post)
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
                        dispatch({
                          type: CURRENT_COMMENT,
                          payload: {
                            comment: { id: item._id, title: item.comment },
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
            ))}
          </ul>

          {isDeleteOpen && (
            <DeleteModal
              id={comment.id}
              title={comment.title}
              setIsDeleteOpen={setIsDeleteOpen}
              dispatch={dispatch}
              action={DELETE_COMMENT}
              call={deleteComment}
              setUpdateData={setUpdateData}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};
