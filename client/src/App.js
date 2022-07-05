import React from "react";
import { Route } from "react-router-dom";

import { Homepage } from "./components/Homepage";
import { Admin } from "./components/admin/Admin";
import { Login } from "./components/Login";
import { Post } from "./components/Post";
import { Page } from "./components/Page";
import { Category } from "./components/Category";

import { CoreReducerProvider } from "./reducers/core";
import { PageProvider } from "./PageContext";

import "./scss/app.scss";

const App = () => {
  return (
    <CoreReducerProvider>
      <Route
        exact
        path="/"
        render={() => (
          <PageProvider>
            <Homepage />
          </PageProvider>
        )}
      />
      <Route
        path="/categories/:category"
        render={() => (
          <PageProvider>
            <Category />
          </PageProvider>
        )}
      />
      <Route
        path="/post/:title"
        render={() => (
          <PageProvider>
            <Post />
          </PageProvider>
        )}
      />
      <Route
        path="/page/:title"
        render={() => (
          <PageProvider>
            <Page />
          </PageProvider>
        )}
      />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/login" component={Login} />
    </CoreReducerProvider>
  );
};

export default App;
