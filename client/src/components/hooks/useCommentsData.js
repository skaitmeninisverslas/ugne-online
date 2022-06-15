import { useContext, useEffect, useState } from "react";

import { CoreReducerContext } from "../../reducers/core";
import { ACTIONS } from "../actions/actions";
import { getComments } from "../helpers/apiCalls";

export const useCommentsData = () => {
  const [updateData, setUpdateData] = useState(false);
  const { state, dispatch } = useContext(CoreReducerContext);

  const { comments, comment } = state;

  useEffect(() => {
    getComments().then((response) => {
      dispatch({
        type: ACTIONS.COMMENTS.GET_COMMENTS,
        payload: {
          comments: response.data.comments,
        },
      });
      setUpdateData(false);
    });
  }, [updateData, dispatch]);

  return { comments, comment, dispatch, setUpdateData };
};
