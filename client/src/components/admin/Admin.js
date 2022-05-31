import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Categories } from "./Categories";
import { Posts } from "./Posts";
import { User } from "./User";
import { Menu } from "./Menu";
import { Subscribers } from "./Subscribers";
import { Pages } from "./Pages";
import { Comments } from "./Comments";
import { getAllData } from "../helpers/apiCalls";
import { setLocalStorageForComponent } from "../helpers/constants";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";

export const Admin = () => {
  const [component, setComponent] = useState(setLocalStorageForComponent);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  const { categories, menu, post, pages, subscriber, comments, user } = data;

  useEffect(() => {
    getAllData().then((res) => {
      setData(res.data);
      setIsLoading(false);

      const isAuthenticated = res.data.authenticated;
      isAuthenticated
        ? setAuthenticated(isAuthenticated)
        : history.push("/login");
    });
  }, [history]);

  useEffect(() => {
    localStorage.setItem("component", JSON.stringify(component));
  }, [component]);

  const components = () => {
    switch (component) {
      case "posts":
        return <Posts posts={post} categories={categories} />;
      case "pages":
        return <Pages pages={pages} />;
      case "categories":
        return <Categories categories={categories} />;
      case "user":
        return <User user={user} />;
      case "comments":
        return <Comments comments={comments} posts={post} />;
      case "menu":
        return <Menu menu={menu} />;
      case "subscribers":
        return <Subscribers subscribers={subscriber} />;

      default:
        return <Posts posts={post} categories={categories} />;
    }
  };

  return (
    <Fragment>
      {!isLoading && authenticated && (
        <div className="h-100 container-fluid admin">
          <div className="row h-100">
            <ul
              className="overflow-auto p-3 col-lg-2 col-md-3 col-sm-4 h-100 bg-dark d-flex flex-column justify-content-center mb-0"
              style={{ listStyleType: "none" }}
            >
              <h2 className="text-white mt-4 text-center">Admin Panel</h2>
              <li className="mt-auto">
                <a
                  href="/"
                  className="d-block link text-center text-white text-decoration-none"
                >
                  <i className="fas fa-arrow-alt-circle-left text-white"></i>{" "}
                  Back to Homepage
                </a>
              </li>

              <li className="mt-3">
                {post && (
                  <button
                    className="text-sm-right btn btn-light w-100"
                    onClick={() => setComponent("posts")}
                    name="posts"
                  >
                    <i className="fas fa-copy"></i> Posts
                  </button>
                )}
              </li>

              <li className="mt-3">
                {pages && (
                  <button
                    className="text-sm-right btn btn-light w-100"
                    onClick={() => setComponent("pages")}
                    name="pages"
                  >
                    <i className="fas fa-copy"></i> Pages
                  </button>
                )}
              </li>

              <li className="mt-3">
                {categories && (
                  <button
                    className="text-sm-right btn btn-light w-100"
                    onClick={() => setComponent("categories")}
                    name="categories"
                  >
                    <i className="fas fa-folder"></i> Categories
                  </button>
                )}
              </li>

              <li className="mt-3">
                {user && (
                  <button
                    className="text-sm-right btn btn-light w-100"
                    onClick={() => setComponent("user")}
                    name="user"
                  >
                    <i className="fas fa-user"></i> User Account
                  </button>
                )}
              </li>

              <li className="mt-3">
                {menu && (
                  <button
                    className="text-sm-right btn btn-light w-100"
                    onClick={() => setComponent("menu")}
                    name="menu"
                  >
                    <i className="fas fa-ellipsis-h"></i> Menu
                  </button>
                )}
              </li>

              <li className="mt-3">
                <button
                  className="text-sm-right btn btn-light w-100"
                  onClick={() => setComponent("subscribers")}
                  name="subscribers"
                >
                  <i className="fas fa-user"></i> Subscribers
                </button>
              </li>

              <li className="my-3">
                {comments && (
                  <button
                    className="text-sm-right btn btn-light w-100"
                    onClick={() => setComponent("comments")}
                    name="comments"
                  >
                    <i className="fas fa-comments"></i> Comments
                  </button>
                )}
              </li>

              <li className="mt-auto align-self-end">
                <a className="btn btn-danger" href={`/api/auth/logout`}>
                  Logout <i className="fas fa-sign-out-alt"></i>
                </a>
              </li>
            </ul>

            <div className="col-lg-10 col-md-9 col-sm-8 p-4 h-100 overflow-auto">
              {components()}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
