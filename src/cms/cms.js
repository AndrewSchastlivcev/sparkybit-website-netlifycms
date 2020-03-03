import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";

import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import ServicesPagePreview from "./preview-templates/ServicesPagePreview";
import AboutUsPagePreview from "./preview-templates/AboutUsPagePreview";
import ContactsPagePreview from "./preview-templates/ContactsPagePreview";
import CareerPostPreview from "./preview-templates/CareerPostPreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("services", ServicesPagePreview);
CMS.registerPreviewTemplate("about-us", AboutUsPagePreview);
CMS.registerPreviewTemplate("contacts", ContactsPagePreview);
CMS.registerPreviewTemplate("careers", CareerPostPreview);

