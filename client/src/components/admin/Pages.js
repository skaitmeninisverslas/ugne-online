import React, { useState } from "react";

import { AddEditPostPageModal } from "./components/modals/AddEditPostPageModal";
import { DeleteModal } from "./components/modals/DeleteModal";

export const Pages = ({ pages }) => {
  const [isPage, setIsPage] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState();

  return (
    <div className="w-100">
      <h2 className="text-center">All Pages</h2>

      <button
        className="btn btn-light mt-4"
        onClick={() => {
          setIsAddEditOpen(true);
          setIsPage(true);
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
                <div className="card-subtitle text-muted">{page.subtitle}</div>
              </div>

              <div className="d-flex flex-column ml-auto border-left pl-4">
                <button
                  onClick={() => {
                    setModalData(page);
                    setIsEdit(true);
                    setIsAddEditOpen(true);
                    setIsPage(true);
                  }}
                  className="btn btn-primary"
                >
                  <i className="fas fa-pen"></i>
                </button>

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => {
                    setModalData({ id: page._id, title: page.title });
                    setIsDeleteOpen(true);
                    setIsPage(true);
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
          data={modalData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsAddEditOpen={setIsAddEditOpen}
          isPage={isPage}
          setIsPage={setIsPage}
        />
      )}

      {isDeleteOpen && (
        <DeleteModal
          id={modalData.id}
          title={modalData.title}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          isPage={isPage}
          setIsPage={setIsPage}
        />
      )}
    </div>
  );
};
