import axios, { get, post } from "axios";

import { API_BASE, INSTAGRAM_LINK } from "./constants";

// CORE CALL
export const coreCall = (calls) => axios.all(calls);
export const spreadResponseForMultipleCalls = (response) =>
  axios.spread(response);

export const getInstagramFeed = () =>
  get(INSTAGRAM_LINK, {
    headers: {
      "Content-type": "application/json",
    },
  });
// ADD,EDIT,DELETE POST CALLS
// POSTS
export const deletePost = (id) => get(`${API_BASE}/api/post/delete/${id}`);
export const createPost = (data) => {
  return post(`${API_BASE}/api/posts/store`, data);
};
export const editPost = (id, data) =>
  post(`${API_BASE}/api/post/edit/${id}`, data);
export const getPosts = () =>
  get(`${API_BASE}/api/posts/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// PAGES
export const deletePage = (id) => get(`${API_BASE}/api/page/delete/${id}`);
export const createPage = (data) => post(`${API_BASE}/api/page/store`, data);
export const editPage = (id, data) =>
  post(`${API_BASE}/api/page/edit/${id}`, data);
export const getPages = () =>
  get(`${API_BASE}/api/pages/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// CATEGORIES
export const deleteCategory = (id) =>
  get(`${API_BASE}/api/category/delete/${id}`);
export const createCategory = (data) =>
  post(`${API_BASE}/api/category/store`, data);
export const editCategory = (id, data) =>
  post(`${API_BASE}/api/category/change/${id}`, data);
export const getCategories = () =>
  get(`${API_BASE}/api/categories/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// COMMENTS
export const deleteComment = (id) =>
  get(`${API_BASE}/api/comments/delete/${id}`);
export const getComments = () =>
  get(`${API_BASE}/api/comments/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// SUBSCRIBERS
export const deleteSubscriber = (id) =>
  get(`${API_BASE}/api/subscribers/delete/${id}`);
export const createSubscriber = (data) =>
  post(`${API_BASE}/api/subscriber/store`, data);
export const getSubscribers = () =>
  get(`${API_BASE}/api/subscribers/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// MENU
export const editMenu = (id, data) =>
  post(`${API_BASE}/api/menu/edit/${id}`, data);
export const getMenuData = () =>
  get(`${API_BASE}/api/menu/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// USERS
export const editUser = (data) => post(`${API_BASE}/api/user/edit`, data);
export const login = (data) => post(`${API_BASE}/api/users/login`, data);
export const getUserData = () =>
  get(`${API_BASE}/api/user/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });
