import { isEmpty } from "lodash-es";
import React, { Fragment, useState } from "react";

import { ACTIONS } from "../actions/actions";
import { deleteSubscriber } from "../helpers/apiCalls";
import { useSubscribersData } from "../hooks/useSubscribersData";
import { DeleteModal } from "./components/modals/DeleteModal";

const {
  SUBSCRIBERS: { DELETE_SUBSCRIBER, CURRENT_SUBSCRIBER },
} = ACTIONS;

export const Subscribers = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { subscriber, subscribers, dispatch, setUpdateData } =
    useSubscribersData();

  const isLoading = !subscribers || isEmpty(subscribers);

  return (
    <Fragment>
      {!isLoading && (
        <div className="w-100">
          <h2 className="text-center">Subscribers</h2>

          <ul className="list-group text-center mt-3">
            {subscribers.map((item, key) => (
              <li key={key} className="list-group-item">
                {`${item.email} `}

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch({
                      type: CURRENT_SUBSCRIBER,
                      payload: {
                        subscriber: { id: item._id, title: item.email },
                      },
                    });
                    setIsDeleteOpen(true);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>

          {isDeleteOpen && (
            <DeleteModal
              id={subscriber.id}
              title={subscriber.title}
              setIsDeleteOpen={setIsDeleteOpen}
              dispatch={dispatch}
              action={DELETE_SUBSCRIBER}
              call={deleteSubscriber}
              setUpdateData={setUpdateData}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};
