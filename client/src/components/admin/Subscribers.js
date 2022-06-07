import React, { useState } from "react";
import { DeleteModal } from "./components/modals/DeleteModal";

export const Subscribers = ({ subscribers }) => {
  const [modalData, setModalData] = useState();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);

  return (
    <div className="w-100">
      <h2 className="text-center">Subscribers</h2>

      <ul className="list-group text-center mt-3">
        {subscribers.map((item, key) => (
          <li key={key} className="list-group-item">
            {`${item.email} `}

            <button
              className="btn btn-danger"
              onClick={() => {
                setModalData({ id: item._id, title: item.email });
                setIsDeleteOpen(true);
                setIsSubscriber(true);
              }}
            >
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      {isDeleteOpen && (
        <DeleteModal
          id={modalData.id}
          title={modalData.title}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          isSubscriber={isSubscriber}
          setIsSubscriber={setIsSubscriber}
        />
      )}
    </div>
  );
};
