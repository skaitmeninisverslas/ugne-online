import { useContext, useEffect, useRef, useState } from "react";

import { CoreReducerContext } from "../../reducers/core";
import { ACTIONS } from "../actions/actions";
import { getSubscribers } from "../helpers/apiCalls";

export const useAuthentication = () => {
  const [updateData, setUpdateData] = useState(false);

  const { state, dispatch } = useContext(CoreReducerContext);
  const componentMounted = useRef(true);

  const { authenticated } = state;

  useEffect(() => {
    async function fetchData() {
      const authResponse = await getSubscribers();

      if (componentMounted.current) {
        dispatch({
          type: ACTIONS.AUTHENTICATION,
          payload: { authenticated: authResponse.data.authenticated },
        });
        setUpdateData(false);
      }
    }

    fetchData();

    return () => {
      componentMounted.current = false;
    };
  }, [updateData, dispatch]);

  return { authenticated, setUpdateData };
};
