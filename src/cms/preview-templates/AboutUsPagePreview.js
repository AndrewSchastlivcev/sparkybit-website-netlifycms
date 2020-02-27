import React from "react";
import { AboutUsPageTemplate } from "../../templates/about-us-page";

const AboutUsPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  return (
    <AboutUsPageTemplate
      section_1_title={data.section_1_title}
      section_1_content={data.section_1_content}
      section_2_text={data.section_2_text}
      section_3_title={data.section_3_title}
      section_3_text={data.section_3_text}
      section_1_image={data.section_1_image}
      section_2_image={data.section_2_image}
    />
  );
};

export default AboutUsPagePreview;
