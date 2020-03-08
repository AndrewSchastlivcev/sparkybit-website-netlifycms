import React, { Component } from "react"
import { get } from "lodash"
import { Link, graphql } from "gatsby"
import config from "../../../../config/website"
//import Img from "gatsby-image/withIEPolyfill"

import PostPreviewImg from "../../../images/blog/default-preview.jpg"
import { parseDate } from "../../../utils/helpers"

import Layout from "../amp_layout"
import Sidebar from "../amp_sidebar"

export default class AmpBlogPosts extends Component {
  render() {
    const { allWordpressPost } = this.props.data
    const { pageTitle } = this.props

    return (
      <>
        <Sidebar />
        <Layout>
          <main id="main">
            <div className="page-blog">
              <div className="container">
                <h1 className="striped uppercase"> {pageTitle}</h1> <hr />
                {allWordpressPost.edges.map(({ node }) => (
                  <div key={node.path} className="post">
                    <div className="post-cover">
                      {get(
                        node,
                        "featured_media.localFile.childImageSharp.fixed"
                      ) ? (
                        <amp-img
                          src={`../..${node.featured_media.localFile.childImageSharp.fixed.src}`}
                          width="150"
                          height="150"
                          layout="fixed"
                          alt="Post preview"
                        ></amp-img>
                      ) : (
                        <amp-img
                          src={PostPreviewImg}
                          width="150"
                          height="150"
                          alt="default-preview"
                          layout="fixed"
                        ></amp-img>
                      )}
                    </div>

                    <div className="post-content">
                      <div className="content-categories">
                        {node.categories.map((category, index) => (
                          <Link
                            key={category.name + `- ${index}`}
                            to={`/${
                              config.ampPrefix
                            }/categories/${category.name.toLowerCase()} `}
                          >
                            <span className="category-name">
                              {" "}
                              {category.name}{" "}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link to={node.path}>
                        <h3> {node.title} </h3>
                      </Link>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: node.excerpt,
                        }}
                      />
                    </div>
                    <span className="cover-date"> {parseDate(node.date)} </span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </Layout>
      </>
    )
  }
}

export const query = graphql`
  fragment BlogPostFields on wordpress__POST {
    title
    excerpt
    path
    date
    featured_media {
      localFile {
        childImageSharp {
          fixed(quality: 90, width: 150, height: 150) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
    categories {
      name
    }
  }
`
