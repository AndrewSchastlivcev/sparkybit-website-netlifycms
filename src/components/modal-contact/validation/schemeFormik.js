import * as Yup from "yup";
import { withFormik } from "formik";
//import { changeKeyName } from "../../../utils/helpers" //piperdrive
const axios = require("axios");
// const protocol = `http://`;
const host = process.env.GATSBY_TRIGGER || null;
/* const host = `localhost`; */
const endpoint_contact = `/contact`;
const endpoint_vacancy = `/vacancy`;

const url_contact = `${host}${endpoint_contact}`;
const url_vacancy = `${host}${endpoint_vacancy}`;
const authToken = process.env.GATSBY_AUTHORIZATION_KEY || null;

// const hostport = process.env.WEBHOOK_SERVER_PORT || 5454;
// const url = `${protocol}${host}:${hostport}${endpoint}`;

//validation schemes
const phoneRegExp = /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/;
const wordRegExp = /\D/;

//init validate scheme
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, "*Your name is shorter than that")
      .matches(wordRegExp, "*Name must contain only letters")
      .required("*Name is required."),
    phone: Yup.string()
      .min(10, "*It's short number")
      .matches(phoneRegExp, "*Name must contain only numbers")
      .required("Phone number is required!"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required!"),
    recaptcha: Yup.string().required("*recaptcha is a required field")
  }),
  mapPropsToValues: ({ contactFields }) => ({ ...contactFields }),
  //submit for mailgun
  handleSubmit: (payload, { setSubmitting }) => {
    // console.log("payload", payload);
    function isCareersUrl() {
      if (window.location.pathname.search("careers") !== -1) {
        return url_vacancy;
      } else {
        return url_contact;
      }
    }
    const url = isCareersUrl();
    const { closeHandler } = payload;
    let data = /* JSON.stringify */ payload;
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
    closeHandler();
  },
  displayName: "contactForm"
});
export default formikEnhancer;

//pipedrive environment
/* const tokenAPI = process.env.GATSBY_PIPEDRIVE_TOKEN || null
const fieldCityToken = process.env.GATSBY_PIPEDRIVE_FIELD_CITY_TOKEN || null
const fieldMessageToken =
  process.env.GATSBY_PIPEDRIVE_FIELD_MESSAGE_TOKEN || null
const url = `https://api.pipedrive.com/v1/persons?api_token=${tokenAPI}`
 */

//city formik validator
/* city: Yup.string()
      .min(2, "*It's not city")
      .matches(wordRegExp, "*City must contain only letters")
      .required("*City is required."), */

//submit for pipedrive
/* handleSubmit: (payload, { setSubmitting }) => {
    const { closeHandler } = payload
    let data = JSON.stringify(payload)
    
    //custom fields for pipedrive must be changed by field_API_key
    const propsToChange = ["city", "message"]
    const newProps = [fieldCityToken, fieldMessageToken]
    data = changeKeyName(propsToChange, newProps, data)

    fetch(url, {
      method: "POST",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      body: data,
    })
      .then(res => {})
      .then(closeHandler())
      .catch(error => console.error("Error:", error))
    setSubmitting(false)
  }, */

//post form
/* fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        redirect: "follow", // manual, *follow, error
        body: data,
      })
        .then(res => {})
        .then(closeHandler())
        .catch(error => console.error("Error:", error))
      setSubmitting(false) */
