import { isEmpty } from "lodash";
import React, { Fragment, useState } from "react";

import { ACTIONS } from "../actions/actions";
import { createPage, deletePage, editPage } from "../helpers/apiCalls";
import { usePagesData } from "../hooks/usePagesData";
import { AddEditPostPageModal } from "./components/modals/AddEditPostPageModal";
import { DeleteModal } from "./components/modals/DeleteModal";

const {
  PAGES: { CREATE_PAGE, EDIT_PAGE, DELETE_PAGE, CURRENT_PAGE },
} = ACTIONS;

export const Pages = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { pages, page, dispatch, setUpdateData } = usePagesData();

  const isLoading = !pages || isEmpty(pages);

  return (
    <Fragment>
      {!isLoading && (
        <div className="w-100">
          <h2 className="text-center">All Pages</h2>

          <button
            className="btn btn-light mt-4"
            onClick={() => {
              setIsEdit(false);
              setIsAddEditOpen(true);
            }}
          >
            <i className="fas fa-plus"></i> New Page
          </button>

          <ul className="mt-4 p-0">
            {pages.map((page, key) => (
              <li className="card mt-2 p-3" key={key} value={page.title}>
                <div className="card-body row">
                  <div className="col-11">
                    <div className="card-title border-bottom pb-2 font-weight-bold">
                      {page.title}
                    </div>
                    <div className="card-subtitle text-muted">
                      {page.subtitle}
                    </div>
                  </div>

                  <div className="d-flex flex-column ml-auto border-left pl-4">
                    <button
                      onClick={() => {
                        dispatch({
                          type: CURRENT_PAGE,
                          payload: {
                            page,
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
                          type: CURRENT_PAGE,
                          payload: {
                            page: {
                              id: page._id,
                              title: `page: ${page.title}`,
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
            ))}
          </ul>

          {isAddEditOpen && (
            <AddEditPostPageModal
              data={{ content: page, component: "page" }}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setIsAddEditOpen={setIsAddEditOpen}
              dispatch={dispatch}
              action={isEdit ? EDIT_PAGE : CREATE_PAGE}
              call={isEdit ? editPage : createPage}
              setUpdateData={setUpdateData}
            />
          )}

          {isDeleteOpen && (
            <DeleteModal
              id={page.id}
              title={page.title}
              setIsDeleteOpen={setIsDeleteOpen}
              dispatch={dispatch}
              action={DELETE_PAGE}
              call={deletePage}
              setUpdateData={setUpdateData}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};
