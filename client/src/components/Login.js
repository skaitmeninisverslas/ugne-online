import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { getAllData } from "./helpers/apiCalls";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getAllData().then((res) => {
      setIsLoading(false);

      const isAuthenticated = res.data.authenticated;

      if (isAuthenticated) {
        setAuthenticated(isAuthenticated);
        history.push("/admin");
      }
    });
  }, [history]);

  return (
    <Fragment>
      {!isLoading && !authenticated && (
        <div className="container h-100 d-flex">
          <div className="jumbotron m-auto">
            <div className="container">
              <h3 className="display-6">Please Sign in</h3>
            </div>
            <form
              action={`/api/users/login`}
              className="mt-4"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>

              <div className="form-group text-center">
                <input
                  className="btn btn-secondary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};
