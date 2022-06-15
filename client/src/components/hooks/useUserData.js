import { useContext, useEffect, useState } from "react";
import { CoreReducerContext } from "../../reducers/core";
import { ACTIONS } from "../actions/actions";
import { getUserData } from "../helpers/apiCalls";

export const useUserData = () => {
  const [updateData, setUpdateData] = useState(false);

  const { state, dispatch } = useContext(CoreReducerContext);

  const { user } = state;

  useEffect(() => {
    getUserData().then((res) => {
      dispatch({
        type: ACTIONS.USER.GET_USER,
        payload: { user: res.data.user },
      });

      setUpdateData(false);
    });
  }, [updateData, dispatch]);

  return { user, dispatch, setUpdateData };
};
