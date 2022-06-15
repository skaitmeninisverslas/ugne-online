import { useContext, useEffect, useState } from "react";

import { CoreReducerContext } from "../../reducers/core";
import { ACTIONS } from "../actions/actions";
import { getSubscribers } from "../helpers/apiCalls";

export const useSubscribersData = () => {
  const [updateData, setUpdateData] = useState(false);

  const { state, dispatch } = useContext(CoreReducerContext);

  const { subscribers, subscriber } = state;

  useEffect(() => {
    getSubscribers().then((response) => {
      dispatch({
        type: ACTIONS.SUBSCRIBERS.GET_SUBSCRIBERS,
        payload: { subscribers: response.data.subscriber },
      });

      setUpdateData(false);
    });
  }, [updateData, dispatch]);

  return { subscriber, subscribers, dispatch, setUpdateData };
};
