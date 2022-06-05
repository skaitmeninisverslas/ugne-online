import axios from "axios";

import { ADMIN_LINK, INSTAGRAM_LINK } from "./constants";

// CORE CALL
const coreCall = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getAllData = () =>
  coreCall.get(ADMIN_LINK, {
    headers: {
      "Content-type": "application/json",
    },
  });
export const getInstagramFeed = () =>
  coreCall.get(INSTAGRAM_LINK, {
    headers: {
      "Content-type": "application/json",
    },
  });
// ADD,EDIT,DELETE POST CALLS
// POSTS
export const deletePost = (id) => coreCall.get(`/api/post/delete/${id}`);
export const createPost = (data) => {
  return coreCall.post(`/api/posts/store`, data);
};
export const editPost = (id, data) =>
  coreCall.post(`/api/post/edit/${id}`, data);
// PAGES
export const deletePage = (id) => coreCall.get(`/api/page/delete/${id}`);
export const createPage = (data) => {
  return coreCall.post(`/api/page/store`, data);
};
export const editPage = (id, data) =>
  coreCall.post(`/api/page/edit/${id}`, data);
