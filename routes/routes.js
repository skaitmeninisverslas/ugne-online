const multer = require("multer");
const upload = multer({
  fileFilter(req, file, cb) {
    cb(undefined, true);
  },
});

// USER
const userEditController = require("../controllers/user/edit");
const loginUserController = require("../controllers/user/login");
const getUserController = require("../controllers/user/get");
// PAGES
const storePageController = require("../controllers/pages/store");
const deletePageController = require("../controllers/pages/delete");
const pageEditController = require("../controllers/pages/edit");
const getPagesController = require("../controllers/pages/get");
// POSTS
const storePostController = require("../controllers/posts/store");
const deletePostController = require("../controllers/posts/delete");
const postEditController = require("../controllers/posts/change");
const getPostsController = require("../controllers/posts/get");
// CATEGORIES
const storeCategoryController = require("../controllers/categories/store");
const deleteCategoryController = require("../controllers/categories/delete");
const storeEditCategoryController = require("../controllers/categories/change");
const getCategoriesController = require("../controllers/categories/get");
// MENU
const editMenuController = require("../controllers/menu/edit");
const getMenuController = require("../controllers/menu/get");
// SUBSCRIBERS
const subscriberController = require("../controllers/subscribers/store");
const deleteSubscriberController = require("../controllers/subscribers/delete");
const getSubscribersController = require("../controllers/subscribers/get");
// GENERAL
const dataController = require("../controllers/data");
const logoutController = require("../controllers/logout");
// COMMENTS
const storeComment = require("../controllers/comments/store");
const deleteComment = require("../controllers/comments/delete");
const getComments = require("../controllers/comments/get");

// MIDDLEWARES
const storePost = require("../middleware/storePost");
const storeCategory = require("../middleware/storeCategory");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.use(
    "/api/posts/store",
    upload.fields([{ name: "image" }, { name: "ogimage" }]),
    storePost
  );
  app.use("/api/categories/store", storeCategory);

  // Posts routes
  app.post("/api/posts/store", auth, storePostController);
  app.post(
    "/api/post/edit/:id",
    auth,
    upload.fields([{ name: "image" }, { name: "ogimage" }]),
    postEditController
  );
  app.get("/api/post/delete/:id", auth, deletePostController);
  app.get("/api/posts/get", getPostsController);
  // Page routes
  app.post(
    "/api/page/store",
    auth,
    upload.fields([{ name: "image" }, { name: "ogimage" }]),
    storePageController
  );
  app.post(
    "/api/page/edit/:id",
    upload.fields([{ name: "image" }, { name: "ogimage" }]),
    auth,
    pageEditController
  );
  app.get("/api/page/delete/:id", auth, deletePageController);
  app.get("/api/pages/get", getPagesController);
  // Categories routes
  app.post("/api/category/store", auth, storeCategoryController);
  app.get("/api/categories/get", getCategoriesController);
  app.post("/api/category/change/:id", auth, storeEditCategoryController);
  app.get("/api/category/delete/:id", auth, deleteCategoryController);
  // User routes
  app.post("/api/users/login", upload.none(), loginUserController, auth);
  app.post("/api/user/edit", auth, upload.single("image"), userEditController);
  app.get("/api/auth/logout", logoutController);
  app.get("/api/user/get", getUserController);
  // Menu routes
  app.get("/api/menu/get", getMenuController);
  app.post(
    "/api/menu/edit/:id",
    auth,
    upload.single("image"),
    editMenuController
  );
  // Comments
  app.get("/api/comments/delete/:id", auth, deleteComment);
  app.get("/api/comments/get", getComments);
  app.post("/api/comments/store", storeComment);
  // Subscriber
  app.post("/api/subscriber/store", subscriberController);
  app.get("/api/subscribers/delete/:id", auth, deleteSubscriberController);
  app.get("/api/subscribers/get", auth, getSubscribersController);
  // All data
  app.get("/api/data", dataController);
};

// UNUSED, BUT MIGHT BE REQUIRED STUFF
// app.post("/api/users/register", redirectIfAuthenticated, upload.single("image"), storeUserController);
// app.get("/api/user/delete/:id", auth, deleteUserController);
// const redirectIfAuthenticated = require("../middleware/redirectIfAuthenticated");
// const deleteUserController = require("../controllers/user/delete");
// const storeUserController = require("../controllers/user/store");
