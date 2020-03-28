import React from "react";
import { ContactsPageTemplate } from "../../templates/contacts-page";

const ContactsPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();  
  return (
    <ContactsPageTemplate
      contact_title={data.contact_title}
      contact_email={data.contact_email}
      contact_phone={data.contact_phone}
      btn_name={data.btn_name}
      countriesList={data.countries}
      mapCover={true}
    />
  );
};

export default ContactsPagePreview;
