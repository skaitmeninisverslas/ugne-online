import { useContext, useEffect, useState } from "react";

import { CoreReducerContext } from "../../reducers/core";
import { ACTIONS } from "../actions/actions";
import { getPages } from "../helpers/apiCalls";

export const usePagesData = () => {
  const [updateData, setUpdateData] = useState(false);

  const { state, dispatch } = useContext(CoreReducerContext);

  const { pages, page } = state;

  useEffect(() => {
    getPages().then((res) => {
      dispatch({
        type: ACTIONS.PAGES.GET_PAGE,
        payload: { pages: res.data.pages },
      });
      setUpdateData(false);
    });
  }, [updateData, dispatch]);

  return { pages, page, dispatch, setUpdateData };
};
