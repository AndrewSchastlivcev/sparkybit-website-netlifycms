import React, { Component } from "react"
import { graphql } from "gatsby"

import { isBrowser } from "../../../utils/helpers"
import AstRenderer from "../../../utils/render-ast"

import Layout from "../amp_layout"

if (isBrowser()) {
  import(
    "!!style-loader/url" +
      "!file-loader?name=[hash].css" +
      "!sass-loader" +
      (process.env.NODE_ENV === "production"
        ? "?minimize=true&outputStyle=compressed"
        : "") +
      "!../../../styles/_wordpress.scss"
  )
}

export default class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost
    return (
      <>
        <Layout>
          <main id="main">
            <div className="page-post">
              <div className="container wp-container">
                <h1 className="striped uppercase">{post.title}</h1>
                <AstRenderer ast={post.htmlAst} />
              </div>
            </div>
          </main>
        </Layout>
      </>
    )
  }
}

export const pageQuery = graphql`
  query($id: String) {
    wordpressPost(id: { eq: $id }) {
      htmlAst
      title
      excerpt
      date_published: date(formatString: "YYYY-MM-DD")
      featured_media {
        localFile {
          id
          publicURL
        }
      }
    }
  }
`
