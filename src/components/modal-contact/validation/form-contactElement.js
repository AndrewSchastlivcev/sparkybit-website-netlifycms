import React, { Component } from "react";
import classnames from "classnames";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaKey = process.env.GATSBY_RECAPTCHA_KEY || null;

//label of require
const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

//label constructor
const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

//Input construct use Label
export const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    "field-input",
    {
      "animated error": !!error
    },
    className
  );
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};

//Textarea construct use Label
export const TextAreaInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    "field-input field-full-width",
    {
      "animated pulse error": !!error
    },
    className
  );

  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <textarea
        id={id}
        className="contact-message"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      {/* <InputFeedback error={error} /> */}
    </div>
  );
};

// recaptcha
export class ReCaptchaForm extends Component {
  constructor(props) {
    super(props);
    this.recaptcha = React.createRef();
  }

  componentDidMount() {
    if (this.recaptcha) {
      this.recaptcha.reset();
    }
  }

  render() {
    const {
      label,
      error,
      value,
      setFieldValue,
      onChange,
      className
    } = this.props;
    const classes = classnames(
      "recaptcha-required",
      {
        "animated error": !!error
      },
      className
    );

    return (
      <div className={classes}>
        <Label error={error}>{label}</Label>
        <div className="modal-recaptcha" value={value} onChange={onChange}>
          <ReCAPTCHA
            ref={el => (this.recaptcha = el)}
            className="g-recaptcha"
            sitekey={recaptchaKey}
            onChange={res => setFieldValue("recaptcha", res)}
          />
          {/* <InputFeedback error={error} /> */}
        </div>
      </div>
    );
  }
}
