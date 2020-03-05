import React, { Component } from "react";
import { v4 } from "uuid";

export default class CountriesSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.countriesList[0]
    };
  }

  selectCountry(event, country) {
    event.preventDefault();
    this.setState({ country });
    this.props.setCountry(country);
  }
  render() {
    const { countriesList } = this.props;
    return (
      <ul className="contact-list">
        {countriesList.map(c => {
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
                onClick={e => this.selectCountry(e, c)}
                onKeyDown={e => this.selectCountry(e, c)}
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
