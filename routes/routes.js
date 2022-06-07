const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({
  fileFilter(req, file, cb) {
    cb(undefined, true);
  },
  storage: storage,
});

// USER
const userEditController = require("../controllers/user/edit");
const loginUserController = require("../controllers/user/login");
// PAGES
const storePageController = require("../controllers/pages/store");
const deletePageController = require("../controllers/pages/delete");
const pageEditController = require("../controllers/pages/edit");
// POSTS
const storePostController = require("../controllers/posts/store");
const deletePostController = require("../controllers/posts/delete");
const postEditController = require("../controllers/posts/change");
// CATEGORIES
const storeCategoryController = require("../controllers/categories/store");
const deleteCategoryController = require("../controllers/categories/delete");
const storeEditCategoryController = require("../controllers/categories/change");
// MENU
const editMenuController = require("../controllers/menu/edit");
// SUBSCRIBERS
const subscriberController = require("../controllers/subscribers/store");
const deleteSubscriberController = require("../controllers/subscribers/delete");
// GENERAL
const dataController = require("../controllers/data");
const logoutController = require("../controllers/logout");
// COMMENTS
const storeComment = require("../controllers/comments/store");
const deleteComment = require("../controllers/comments/delete");

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
  // Categories routes
  app.post("/api/category/store", auth, storeCategoryController);
  app.post("/api/category/change/:id", auth, storeEditCategoryController);
  app.get("/api/category/delete/:id", auth, deleteCategoryController);
  // User routes
  app.post("/api/users/login", upload.none(), loginUserController, auth);
  app.post("/api/user/edit", auth, upload.single("image"), userEditController);
  app.get("/api/auth/logout", logoutController);
  // Menu routes
  app.post(
    "/api/menu/edit/:id",
    auth,
    upload.single("image"),
    editMenuController
  );
  // Comments
  app.get("/api/comments/delete/:id", auth, deleteComment);
  app.post("/api/comments/store", storeComment);
  // Subscriber
  app.post("/api/subscriber/store", subscriberController);
  app.get("/api/subscribers/delete/:id", deleteSubscriberController);
  // All data
  app.get("/api/data", dataController);
};

// UNUSED, BUT MIGHT BE REQUIRED STUFF
// app.post("/api/users/register", redirectIfAuthenticated, upload.single("image"), storeUserController);
// app.get("/api/user/delete/:id", auth, deleteUserController);
// const redirectIfAuthenticated = require("../middleware/redirectIfAuthenticated");
// const deleteUserController = require("../controllers/user/delete");
// const storeUserController = require("../controllers/user/store");
