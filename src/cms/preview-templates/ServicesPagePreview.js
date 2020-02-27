import React from "react";
import { ServicesPageTemplate } from "../../templates/services-page";

const ServicesPagePreview = ({ entry, widgetFor }) => (
  <ServicesPageTemplate
    title={entry.getIn(["data", "title"])}
    heading={entry.getIn(["data", "heading"])}
    image={entry.getIn(["data", "image"])}
    subheading={entry.getIn(["data", "subheading"])}
    content={widgetFor("body")}
  />
);

export default ServicesPagePreview;
