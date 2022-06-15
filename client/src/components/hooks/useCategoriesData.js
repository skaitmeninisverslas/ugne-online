import { useContext, useEffect, useState } from "react";
import { CoreReducerContext } from "../../reducers/core";

import { ACTIONS } from "../actions/actions";
import { getCategories } from "../helpers/apiCalls";

export const useCategoriesData = () => {
  const [updateData, setUpdateData] = useState(false);

  const { state, dispatch } = useContext(CoreReducerContext);

  const { categories, category } = state;

  useEffect(() => {
    getCategories().then((res) => {
      dispatch({
        type: ACTIONS.CATEGORIES.GET_CAT,
        payload: { categories: res.data.categories },
      });
      setUpdateData(false);
    });
  }, [updateData, dispatch]);

  return { categories, category, dispatch, setUpdateData };
};
