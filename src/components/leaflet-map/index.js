import React, { Component } from "react";
import { isBrowser } from "../../utils/helpers";

export default class LeafletMap extends Component {
  render() {
    if (isBrowser()) {
      const { Map, Marker, Popup, TileLayer } = require("react-leaflet");
      const { countries } = this.props;
      const coordOffice = countries.offices[0];
      return (
        <Map
          ref={mapEl => (this.mapEl = mapEl)}
          center={[coordOffice.latitude_office, coordOffice.longitude_office]}
          zoom={countries.lenght > 2 ? 13 : 6}
        >
          <TileLayer
            url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
            id="mapbox.streets"
            accessToken={`${process.env.GATSBY_MAPBOX_API_KEY || null}`}
          />
          {countries.offices.map(o => {
            return (
              <Marker
                key={o.office}
                position={[o.latitude_office, o.longitude_office]}
              >
                <Popup>Hello from {o.office}!</Popup>
              </Marker>
            );
          })}
        </Map>
      );
    }
    return null;
  }
}
