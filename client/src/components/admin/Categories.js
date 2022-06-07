import React, { useState } from "react";
import { AddEditCategoryModal } from "./components/modals/AddEditCategoryModal";
import { DeleteModal } from "./components/modals/DeleteModal";

export const Categories = ({ categories }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [modalData, setModalData] = useState();

  return (
    <div className="">
      <h2 className="text-center">Categories</h2>

      <button
        className="btn btn-light mt-4"
        onClick={() => {
          setIsAddEditOpen(true);
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
                    setModalData(category);
                    setIsAddEditOpen(true);
                    setIsEdit(true);
                  }}
                >
                  <i className="fas fa-pen"></i>
                </button>

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => {
                    setModalData({ id: category._id, title: category.title });
                    setIsDeleteOpen(true);
                    setIsCategory(true);
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
          data={modalData}
          setIsAddEditOpen={setIsAddEditOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}

      {isDeleteOpen && (
        <DeleteModal
          id={modalData.id}
          title={modalData.title}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          isCategory={isCategory}
          setIsCategory={setIsCategory}
        />
      )}
    </div>
  );
};
