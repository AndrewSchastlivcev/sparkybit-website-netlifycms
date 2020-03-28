import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

import PostPreviewImg from "../img/blog/default-preview.jpg";
import Img from "gatsby-image/withIEPolyfill";
import { kebabCase } from "lodash";
import { v4 } from "uuid";

class TagRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;
    return (
      <Layout>
        <div id="main">
          <div className="page-blog">
            <div className="container">
              <h1 className="h2 striped uppercase">{tagHeader}</h1>
              <hr />
              {posts &&
                posts.map(({ node: post }) => (
                  <div key={v4()} className="post-block">
                    <div className="preview-block">
                      {post.frontmatter.featuredimage ? (
                        <Img
                          className="preview"
                          fluid={
                            post.frontmatter.featuredimage.childImageSharp.fluid
                          }
                          alt="Post preview"
                        />
                      ) : (
                        <img
                          className="preview"
                          src={PostPreviewImg}
                          alt="default-preview"
                        />
                      )}
                      <span className="text">{post.frontmatter.date}</span>
                    </div>
                    <div className="content-block">
                      <div className="category-list">
                        {post.frontmatter.tags.map((category, index) => (
                          <Link
                            key={v4()}
                            to={`/tags/${kebabCase(category)}`}
                          >
                            <span className="post-category">{category}</span>
                          </Link>
                        ))}
                      </div>
                      <Link to={post.fields.slug}>
                        <h3 className="post-title">{post.frontmatter.title}</h3>
                      </Link>
                      <p className="post-excerpt">{post.excerpt}</p>
                    </div>
                  </div>
                ))}
              <div className="circle circle-1" />
              <div className="circle circle-2" />
              <div className="circle circle-3" />
              <p>
                <Link to="/blog/">Return to blogs</Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            tags
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
