import { useContext, useEffect, useState } from "react";

import { CoreReducerContext } from "../../reducers/core";
import { ACTIONS } from "../actions/actions";
import { getMenuData } from "../helpers/apiCalls";

export const useMenuData = () => {
  const [updateData, setUpdateData] = useState(false);
  const { state, dispatch } = useContext(CoreReducerContext);

  const { menu } = state;

  useEffect(() => {
    getMenuData().then((res) => {
      dispatch({
        type: ACTIONS.MENU.GET_MENU,
        payload: { menu: res.data.menu[0] },
      });
      setUpdateData(false);
    });
  }, [updateData, dispatch]);

  return { menu, dispatch, setUpdateData };
};
