import React from "react";
import {
  TextInput,
  TextAreaInput,
  ReCaptchaForm
} from "./validation/form-contactElement";

//custom form construct

export const contactForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    actionSubmit,
    setFieldValue
  } = props;

  const resetForm = () => {
    handleReset();
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="modal-content"
      encType="multipart/form-data"
      {...(values.closeHandler = actionSubmit)}
    >
      <div className="modal-fields">
        {/* <TextInput
          name="name"
          id="name"
          type="text"
          label="Name"
          placeholder="John"
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        /> */}

        {/*   <TextInput
          name="city"
          id="city"
          type="text"
          label="City"
          placeholder="London"
          error={touched.city && errors.city}
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
        /> */}

        {/* <TextInput
          name="phone"
          id="phone"
          type="text"
          label="Phone"
          placeholder="+44 20 7946 0148"
          error={touched.phone && errors.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        /> */}

        <TextInput
          name="email"
          id="email"
          type="text"
          label="Email"
          placeholder="email@domain.com"
          error={touched.email && errors.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <ReCaptchaForm
          error={errors.recaptcha}
          value={values.recaptcha}
          setFieldValue={setFieldValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextAreaInput
          name="message"
          id="message"
          type="text"
          label="Message"
          placeholder="your message"
          cols="29"
          rows="3"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.message && errors.message}
          value={values.message}
        />
      </div>
      <div className="modal-control">
        <button
          type="button"
          className="heading btn btn-primary submitBtn"
          onClick={resetForm}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="heading btn btn-primary submitBtn"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
