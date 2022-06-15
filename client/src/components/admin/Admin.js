import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Categories } from "./Categories";
import { Posts } from "./Posts";
import { User } from "./User";
import { Menu } from "./Menu";
import { Subscribers } from "./Subscribers";
import { Pages } from "./Pages";
import { Comments } from "./Comments";
import { setLocalStorageForComponent } from "../helpers/constants";
import { useAuthentication } from "../hooks/useAuthentication";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";

export const Admin = () => {
  const [component, setComponent] = useState(setLocalStorageForComponent);

  const { authenticated } = useAuthentication();
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/login");
    }
  }, [authenticated, history]);

  useEffect(() => {
    localStorage.setItem("component", JSON.stringify(component));
  }, [component]);

  const setButtonActive = (activeComponent) =>
    activeComponent === component
      ? {
          backgroundColor: "#2271B1",
          border: "#2271B1",
          color: "#fff",
        }
      : {};

  const components = () => {
    switch (component) {
      case "posts":
        return <Posts />;
      case "pages":
        return <Pages />;
      case "categories":
        return <Categories />;
      case "user":
        return <User />;
      case "comments":
        return <Comments />;
      case "menu":
        return <Menu />;
      case "subscribers":
        return <Subscribers />;

      default:
        return <Posts />;
    }
  };

  return (
    <Fragment>
      {authenticated && (
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
                <button
                  className="text-sm-right btn btn-light w-100 shadow-none"
                  onClick={() => setComponent("posts")}
                  style={setButtonActive("posts")}
                  name="posts"
                >
                  <i className="fas fa-copy"></i> Posts
                </button>
              </li>

              <li className="mt-3">
                <button
                  className="text-sm-right btn btn-light w-100 shadow-none"
                  onClick={() => setComponent("pages")}
                  style={setButtonActive("pages")}
                  name="pages"
                >
                  <i className="fas fa-copy"></i> Pages
                </button>
              </li>

              <li className="mt-3">
                <button
                  className="text-sm-right btn btn-light w-100 shadow-none"
                  onClick={() => setComponent("categories")}
                  style={setButtonActive("categories")}
                  name="categories"
                >
                  <i className="fas fa-folder"></i> Categories
                </button>
              </li>

              <li className="mt-3">
                <button
                  className="text-sm-right btn btn-light w-100 shadow-none"
                  onClick={() => setComponent("user")}
                  style={setButtonActive("user")}
                  name="user"
                >
                  <i className="fas fa-user"></i> User Account
                </button>
              </li>

              <li className="mt-3">
                <button
                  className="text-sm-right btn btn-light w-100 shadow-none"
                  onClick={() => setComponent("menu")}
                  style={setButtonActive("menu")}
                  name="menu"
                >
                  <i className="fas fa-ellipsis-h"></i> Menu
                </button>
              </li>

              <li className="mt-3">
                <button
                  className="text-sm-right btn btn-light w-100 shadow-none"
                  onClick={() => setComponent("subscribers")}
                  style={setButtonActive("subscribers")}
                  name="subscribers"
                >
                  <i className="fas fa-user"></i> Subscribers
                </button>
              </li>

              <li className="my-3">
                <button
                  className="text-sm-right btn btn-light w-100 shadow-none"
                  onClick={() => setComponent("comments")}
                  style={setButtonActive("comments")}
                  name="comments"
                >
                  <i className="fas fa-comments"></i> Comments
                </button>
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
