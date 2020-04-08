// Helper styles for demo
import "./modal.scss";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";

const axios = require("axios");
const captchaKey = process.env.GATSBY_RECAPTCHA_KEY || null;
const host = process.env.GATSBY_TRIGGER || null;
/* const host = `localhost`; */
const endpoint_contact = `/contact`;
const endpoint_vacancy = `/vacancy`;

const url_contact = `${host}${endpoint_contact}`;
const url_vacancy = `${host}${endpoint_vacancy}`;
const authToken = process.env.GATSBY_AUTHORIZATION_KEY || null;
// const hostport = process.env.WEBHOOK_SERVER_PORT || 5454;
// const url = `${protocol}${host}:${hostport}${endpoint}`;

const request = () => {
  // console.log("payload", payload);
  function isCareersUrl() {
    if (window.location.pathname.search("careers") !== -1) {
      return url_vacancy;
    } else {
      return url_contact;
    }
  }
  const url = isCareersUrl();
  let data = /* JSON.stringify  payload;*/ null
  if (data) {
    axios({
      method: "POST", //you can set what request you want to be
      url: url,
      data: data,
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      }
    });
  } 
}

export const form = () => (
  <GoogleReCaptchaProvider reCaptchaKey={ captchaKey }>
    <Formik
      initialValues={{ email: "", message: "", captcha: "" }}
      initialTouched={{ captcha: true }}
      onSubmit={async values => {
        await new Promise(resolve => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("*Invalid email address")
          .required("Required"),
        message: Yup.string()
          .min(10, "*Your message is shorter")
          .required("Required"),
        captcha: Yup.string()
          .min(200, "*it`s not reCaptcha token")
          .required("Error verifying reCAPTCHA, please try again")
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <div>
            {console.log("prpos", props)}
            <form 
              onSubmit={handleSubmit}
              method="POST"
              className="modal-content"
              encType="multipart/form-data"
              >
              <div className="modal-field">
                <label
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter your email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>
              <div className="modal-field">
                <label
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="your message"
                  cols="29"
                  rows="8"
                  type="text"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.message && touched.message
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.message && touched.message && (
                  <div className="input-feedback">{errors.message}</div>
                )}
              </div>              
              <GoogleReCaptcha
                onVerify={token => {
                  values.captcha = token
                }
              }
              />
              <div className="modal-field">
                <p
                  id="captcha"
                  className={
                    errors.captcha && touched.captcha
                      ? "text-input error"
                      : "text-input"
                  }
                >
                  This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
                  <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
                </p>
              {errors.captcha && touched.captcha && (
                <div className="input-feedback">{errors.captcha}</div>
              )}
              </div>
              <div className="modal-control">
              <button
                type="button"
                className="heading btn btn-primary submitBtn"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
                >
                Reset
              </button>
              <button  className="heading btn btn-primary submitBtn" type="submit" disabled={isSubmitting}>
                Submit
              </button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  </GoogleReCaptchaProvider>
);