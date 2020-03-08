import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Header from "../amp_header"
import Footer from "../amp_footer"
const Layout = props => (
  <StaticQuery
    query={graphql`
      query ampSiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div id="wrapper">
        <Header siteTitle={data.site.siteMetadata.title} />
        {props.children}
        <Footer />
      </div>
    )}
  />
)

export default Layout
