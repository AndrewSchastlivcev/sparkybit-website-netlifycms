import React from "react";

import { Link, graphql, StaticQuery } from "gatsby";
import PostPreviewImg from "../img/blog/default-preview.jpg";
import Img from "gatsby-image/withIEPolyfill";
import SEO from "../components/seo/index";
// import { kebabCase } from "lodash";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const postsSeo = posts.map(({ node: post }) => {
      return post.frontmatter.title;
    });
    return (
      <>
        <SEO title="Blog" keywords={postsSeo} />
        <div id="main">
          <div className="page-blog">
            <div className="container">
              <h1 className="h2 striped uppercase">RELATED BLOG POSTS</h1>
              <hr />
              {posts &&
                posts.map(({ node: post }) => (
                  <div key={post.id} className="post-block">
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
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
    `}
    render={data => <BlogRoll data={data} />}
  />
);
