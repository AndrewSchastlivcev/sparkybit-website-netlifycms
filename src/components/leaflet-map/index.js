import React, { Component } from "react";
import { isBrowser } from "../../utils/helpers";

export default class LeafletMap extends Component {

  getCenterCoords = offices => {
    let coordsCenter =  null
    if (offices.length > 1) {
      const latitude = offices.reduce((acc, office) => acc + Number(office.latitude_office), 0)
      const longitude = offices.reduce((acc, office) => acc + Number(office.longitude_office), 0)
      coordsCenter = {
        centerLatitude: String(latitude / 2),
        centerLongitude: String(longitude / 2)
      }
      return coordsCenter
   } else {
     coordsCenter = {
      centerLatitude: offices[0].latitude_office,
      centerLongitude: offices[0].longitude_office
     }
     return coordsCenter 
   }
  };

  render() {
    if (isBrowser()) {
      const { Map, Marker, Popup, TileLayer } = require("react-leaflet");
      const { country } = this.props;
      const centerCoords = this.getCenterCoords(country.offices)
      return (
        <Map
          ref={mapEl => (this.mapEl = mapEl)}
          center={[centerCoords.centerLatitude, centerCoords.centerLongitude]}
          zoom={country.offices.length > 1 ? 6 : 10}
        >
          <TileLayer
            url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
            id="mapbox.streets"
            accessToken={`${process.env.GATSBY_MAPBOX_API_KEY || null}`}
          />
          {country.offices.map(o => {
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
