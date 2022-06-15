import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";

import * as messages from "../messages/forms";
import { createSubscriber } from "../helpers/apiCalls";

export const SubscriptionForm = () => {
  const [response, setResponse] = useState();

  const handleSubmitForm = (values, { setFieldValue }) => {
    createSubscriber(values)
      .then((res) => {
        setResponse(res.data);
        setFieldValue("subscribe", "");
      })
      .catch((error) => {
        setResponse(error.response.data);
        setFieldValue("subscribe", "");
      });
  };

  const initialValues = { subscribe: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ submitForm }) => (
        <Fragment>
          <Form>
            <Field
              className="FOOTER__subscribe-input"
              type="email"
              name="subscribe"
              placeholder="Email Address"
              required
            />

            {response && (
              <div id="message" className="FOOTER__information-text mt-0">
                {messages.forms[response]}
              </div>
            )}

            <button
              type="submit"
              onClick={submitForm}
              className="FOOTER__subscribe-button"
            >
              Sign Up
            </button>
          </Form>
        </Fragment>
      )}
    </Formik>
  );
};
