import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";

import { login } from "./helpers/apiCalls";
import { useAuthentication } from "./hooks/useAuthentication";

export const Login = () => {
  const { authenticated, setUpdateData } = useAuthentication();
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      history.push("/admin");
    }
  }, [authenticated, history]);

  const handleSubmitForm = (values) => {
    setUpdateData(true);
    login(values).then((res) => {
      if (res.data === "USER_LOGGED") {
        history.push("/admin");
      }
    });
  };

  const initialValues = { email: "", password: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ submitForm }) =>
        !authenticated && (
          <div className="container h-100 d-flex">
            <div className="jumbotron m-auto">
              <div className="container">
                <h3 className="display-6">Please Sign in</h3>
              </div>
              <Form className="mt-4">
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={submitForm}
                  >
                    Login
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )
      }
    </Formik>
  );
};
