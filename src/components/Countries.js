import React, { Component } from "react";
import { v4 } from "uuid";

export default class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.countries[0]
    };
  }

  setCountry(event, country) {
    event.preventDefault();
    this.setState({ country });
    this.props.getCountry(country);
  }
  render() {
    const { countries } = this.props;
    return (
      <ul className="contact-list">
        {countries.map(c => {
          return (
            <li
              key={v4()}
              className={
                this.state.country.country === c.country ? "active" : ""
              }
            >
              <span
                role="button"
                tabIndex={0}
                onClick={e => this.setCountry(e, c)}
                onKeyDown={e => this.setCountry(e, c)}
              >
                {c.country}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}
