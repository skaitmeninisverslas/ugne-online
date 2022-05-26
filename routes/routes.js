const express = require('express');

// USER
const deleteUserController = require('../controllers/user/delete');
const getUserController = require('../controllers/user/get');
const userEditController = require('../controllers/user/edit');
const storeUserController = require('../controllers/user/store');
const loginUserController = require('../controllers/user/login');
// PAGES
const getPageController = require('../controllers/pages/get');
const storePageController = require('../controllers/pages/store');
const deletePageController = require('../controllers/pages/delete');
const pageEditController = require('../controllers/pages/edit');
// POSTS
const createPostController = require('../controllers/posts/create');
const storePostController = require('../controllers/posts/store');
const deletePostController = require('../controllers/posts/delete');
const getPostController = require('../controllers/posts/get');
const postEditController = require('../controllers/posts/change');
const getPostsByCategoryController = require('../controllers/posts/category');
// CATEGORIES
const storeCategoryController = require('../controllers/categories/store');
const deleteCategoryController = require('../controllers/categories/delete');
const categoryListingController = require('../controllers/categories/list');
const storeEditCategoryController = require('../controllers/categories/change');
// MENU
const editMenuController = require('../controllers/menu/edit');
const getMenuController = require('../controllers/menu/get');
// SUBSCRIBERS
const subscriberController = require('../controllers/subscribers/store');
const subscriberGetController = require('../controllers/subscribers/get');
// GENERAL
const homePageController = require('../controllers/homePage');
const logoutController = require('../controllers/logout');
const loginController = require('../controllers/login');
// COMMENTS
const storeComment = require('../controllers/comments/store');
const deleteComment = require('../controllers/comments/delete');

// MIDDLEWARES
const storePost = require('../middleware/storePost')
const storeCategory = require('../middleware/storeCategory')
const auth = require("../middleware/auth");
const redirectIfAuthenticated = require("../middleware/redirectIfAuthenticated");

module.exports = (app) => {

app.use('/api/posts/store', storePost)
app.use('/api/categories/store', storeCategory)

app.get('/api/homepage', homePageController);
// Posts routes
app.get('/api/post/:title', getPostController);
app.get('/api/posts/new', auth, createPostController);
app.post("/api/posts/store", auth, storePostController);
app.post("/api/post/edit/:id", auth, postEditController);
app.get("/api/post/delete/:id", auth, deletePostController);
// Page routes
app.get('/api/page/:title', getPageController);
app.post('/api/page/store', auth, storePageController);
app.post("/api/page/edit/:id", auth, pageEditController);
app.get("/api/page/delete/:id", auth, deletePageController);
// Categories routes
app.post("/api/categories/store", auth, storeCategoryController);
app.get('/api/categories/:category', getPostsByCategoryController);
app.get('/api/category/list', auth, categoryListingController);
app.post("/api/category/change/:id", auth, storeEditCategoryController);
app.get("/api/category/delete/:id", auth, deleteCategoryController);
// User routes
app.get('/api/user', auth, getUserController);
app.post("/api/users/login", redirectIfAuthenticated, loginUserController);
app.post("/api/users/register", redirectIfAuthenticated, storeUserController);
app.post("/api/user/edit", auth, userEditController);
app.get("/api/auth/logout", logoutController);
app.get("/api/user/delete/:id", auth, deleteUserController);
// Menu routes
app.post("/api/menu/edit/:id", auth, editMenuController);
app.get('/api/menu', getMenuController);
// Comments
app.get("/api/comments/delete/:id", auth, deleteComment);
app.post('/api/comments/store', storeComment);
// Subscriber
app.post("/api/subscribers/store", subscriberController);
app.get('/api/subscribers/get', auth, subscriberGetController);
app.get('/api/login', auth, loginController);
}
