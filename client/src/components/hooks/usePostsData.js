import { useContext, useEffect, useState } from "react";

import { CoreReducerContext } from "../../reducers/core";
import { ACTIONS } from "../actions/actions";
import { getPosts } from "../helpers/apiCalls";

export const usePostsData = () => {
  const [updateData, setUpdateData] = useState(false);
  const { state, dispatch } = useContext(CoreReducerContext);

  const { posts, post } = state;

  useEffect(() => {
    getPosts().then((response) => {
      const postsSortedByDescendingDate = response.data.post.reverse();
      dispatch({
        type: ACTIONS.POSTS.GET_POST,
        payload: {
          posts: postsSortedByDescendingDate,
        },
      });

      setUpdateData(false);
    });
  }, [updateData, dispatch]);

  return { posts, post, dispatch, setUpdateData };
};
