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

// CATEGORIES
export const deleteCategory = (id) =>
  coreCall.get(`/api/category/delete/${id}`);
export const createCategory = (data) => {
  return coreCall.post(`/api/category/store`, data);
};
export const editCategory = (id, data) =>
  coreCall.post(`/api/category/change/${id}`, data);

// COMMENTS
export const deleteComment = (id) => coreCall.get(`/api/comments/delete/${id}`);

// SUBSCRIBERS
export const deleteSubscriber = (id) =>
  coreCall.get(`/api/subscribers/delete/${id}`);
export const createSubscriber = (data) =>
  coreCall.post(`/api/subscriber/store`, data);

// MENU
export const editMenu = (id, data) =>
  coreCall.post(`/api/menu/edit/${id}`, data);

// USERS
export const editUser = (data) => coreCall.post(`/api/user/edit`, data);
