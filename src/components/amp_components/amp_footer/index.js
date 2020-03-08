import React from "react"
//import { useStaticQuery, graphql } from "gatsby"

export default props => {
  /* const useStaticQuery = useStaticQuery(graphql`
    query {
      wordpressWpApiMenusMenusItems(slug: { eq: "social-links" }) {
        items {
          title
          object_id
          url
          classes
        }
      }
    }
  `) */
  const year = new Date().getFullYear()
  return (
    <footer>
      <div>
        <div class="contact-block">
          <div class="contact-info">
            <div>
              <a>+44 20 3773 8945</a>
            </div>
            <div>
              <a>hi@sparkybit.com</a>
            </div>
          </div>
          <div class="contact-social">
            <a href="mailto:hi@sparkybit.com">
              <i class="fa fa-envelope fa-3x" aria-hidden="true"></i>
            </a>
            <a href="tel:+442081331821">
              <i class="fa fa-phone-square fa-3x" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.facebook.com/Sparkybit-232812654328307/"
              class="fb"
            >
              <i class="fa fa-facebook-square fa-3x" aria-hidden="true"></i>
            </a>
            <a href="https://twitter.com/sparkybit" class="tw">
              <i class="fa fa-twitter-square fa-3x" aria-hidden="true"></i>
            </a>
            <a href="https://www.instagram.com/sparkybit_official/" class="in">
              <i class="fa fa-instagram fa-3x" aria-hidden="true"></i>
            </a>
            <a href="https://www.linkedin.com/company/sparkybit/" class="ln">
              <i class="fa fa-linkedin-square fa-3x" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div class="contact-copyright">
          {year} &#xA9; Sparkybit. All rights reserved
        </div>
      </div>
    </footer>
  )
}
