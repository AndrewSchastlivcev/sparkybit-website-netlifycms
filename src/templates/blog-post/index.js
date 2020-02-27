import React from "react";

import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Content, { HTMLContent } from "../../components/Content";
import SEO from "../../components/seo/index";
import "./styles/index.scss";

export const BlogPostTemplate = ({ content, contentComponent, title }) => {
  const PostContent = contentComponent || Content;
  return (
    <>
      <SEO title={title} />
      <main id="main">
        <div className="page-post">
          <div className="container wp-container">
            <h1 className="striped uppercase">{title}</h1>
            <PostContent content={content} />
            <hr />
          </div>
        </div>
      </main>
    </>
  );
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
