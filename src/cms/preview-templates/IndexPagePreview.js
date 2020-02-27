import React from "react";
import { IndexPageTemplate } from "../../templates/index-page";

const IndexPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  if (data) {
    return (
      <IndexPageTemplate
        section_1_image={data.section_1_image}
        section_1_title={data.section_1_title}
        section_1_btn_text={data.section_1_btn_text}
        section_1_subheading={data.section_1_subheading}
        section_2_right_subheading={data.section_2_right_subheading}
        section_2_right_text={data.section_2_right_text}
        section_2_left_subheading={data.section_2_left_subheading}
        section_2_left_text={data.section_2_left_text}
        section_2_title={data.section_2_title}
        section_2_1_image={data.section_2_1_image}
        section_2_2_image={data.section_2_2_image}
        section_3_title={data.section_3_title}
        section_3_text={data.section_3_text}
        section_3_image_desktop={data.section_3_image_desktop}
        section_3_image_mobile={data.section_3_image_mobile}
        content={widgetFor("body")}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;
