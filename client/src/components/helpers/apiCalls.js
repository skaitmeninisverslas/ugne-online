import axios, { get, post } from "axios";

import { ADMIN_LINK, INSTAGRAM_LINK } from "./constants";

// CORE CALL
export const coreCall = (calls) => axios.all(calls);
export const spreadResponseForMultipleCalls = (response) =>
  axios.spread(response);

export const getAllData = () =>
  get(ADMIN_LINK, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const getInstagramFeed = () =>
  get(INSTAGRAM_LINK, {
    headers: {
      "Content-type": "application/json",
    },
  });
// ADD,EDIT,DELETE POST CALLS
// POSTS
export const deletePost = (id) => get(`/api/post/delete/${id}`);
export const createPost = (data) => {
  return post(`/api/posts/store`, data);
};
export const editPost = (id, data) => post(`/api/post/edit/${id}`, data);
export const getPosts = () =>
  get(`/api/posts/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// PAGES
export const deletePage = (id) => get(`/api/page/delete/${id}`);
export const createPage = (data) => post(`/api/page/store`, data);
export const editPage = (id, data) => post(`/api/page/edit/${id}`, data);
export const getPages = () =>
  get(`/api/pages/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// CATEGORIES
export const deleteCategory = (id) => get(`/api/category/delete/${id}`);
export const createCategory = (data) => post(`/api/category/store`, data);
export const editCategory = (id, data) =>
  post(`/api/category/change/${id}`, data);
export const getCategories = () =>
  get(`/api/categories/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// COMMENTS
export const deleteComment = (id) => get(`/api/comments/delete/${id}`);
export const getComments = () =>
  get(`/api/comments/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// SUBSCRIBERS
export const deleteSubscriber = (id) => get(`/api/subscribers/delete/${id}`);
export const createSubscriber = (data) => post(`/api/subscriber/store`, data);
export const getSubscribers = () =>
  get(`/api/subscribers/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// MENU
export const editMenu = (id, data) => post(`/api/menu/edit/${id}`, data);
export const getMenuData = () =>
  get(`/api/menu/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });

// USERS
export const editUser = (data) => post(`/api/user/edit`, data);
export const login = (data) => post(`/api/users/login`, data);
export const getUserData = () =>
  get(`/api/user/get`, {
    headers: {
      "Content-type": "application/json",
    },
  });
