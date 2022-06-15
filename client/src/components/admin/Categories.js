import React, { Fragment, useState } from "react";
import { isEmpty } from "lodash-es";

import { ACTIONS } from "../actions/actions";
import { AddEditCategoryModal } from "./components/modals/AddEditCategoryModal";
import { DeleteModal } from "./components/modals/DeleteModal";
import {
  createCategory,
  deleteCategory,
  editCategory,
} from "../helpers/apiCalls";
import { useCategoriesData } from "../hooks/useCategoriesData";

const {
  CATEGORIES: { EDIT_CAT, DELETE_CAT, CREATE_CAT, SET_DATA },
} = ACTIONS;

export const Categories = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);

  const { categories, category, dispatch, setUpdateData } = useCategoriesData();

  const isLoading = !categories || isEmpty(categories);

  const setCurrentCategory = (payload) => {
    dispatch({
      type: SET_DATA,
      payload: payload,
    });
  };

  return (
    <Fragment>
      {!isLoading && (
        <div>
          <h2 className="text-center">Categories</h2>

          <button
            className="btn btn-light mt-4"
            onClick={() => {
              setIsAddEditOpen(true);
              setIsEdit(false);
            }}
          >
            <i className="fas fa-plus"></i> New Category
          </button>

          <ul className="mt-4 p-0">
            {categories.map((category, key) => (
              <li className="card mt-2 p-3" key={key}>
                <div className="card-body row pt-0 pb-0">
                  <div className="card-title font-weight-bold">
                    {category.title}
                  </div>

                  <div className="d-flex flex-column ml-auto border-left pl-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setCurrentCategory({ category });
                        setIsAddEditOpen(true);
                        setIsEdit(true);
                      }}
                    >
                      <i className="fas fa-pen"></i>
                    </button>

                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => {
                        setCurrentCategory({
                          category: {
                            id: category._id,
                            title: `category: ${category.title}`,
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
            <AddEditCategoryModal
              data={category}
              setIsAddEditOpen={setIsAddEditOpen}
              isEdit={isEdit}
              dispatch={dispatch}
              action={isEdit ? EDIT_CAT : CREATE_CAT}
              call={isEdit ? editCategory : createCategory}
              setUpdateData={setUpdateData}
            />
          )}

          {isDeleteOpen && (
            <DeleteModal
              id={category.id}
              title={category.title}
              setIsDeleteOpen={setIsDeleteOpen}
              dispatch={dispatch}
              action={DELETE_CAT}
              call={deleteCategory}
              setUpdateData={setUpdateData}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};
