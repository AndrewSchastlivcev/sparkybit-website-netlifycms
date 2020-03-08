import React, { Component } from "react"
import { graphql } from "gatsby"

import BlogPosts from "../amp_blog-posts"

export default class BlogCategoryList extends Component {
  render() {
    const { category } = this.props.pageContext
    return (
      <BlogPosts
        data={this.props.data}
        pageTitle={`Blog posts by ${category}`}
      />
    )
  }
}

// Set here the ID of the home page.
export const pageQuery = graphql`
  query($category: String) {
    allWordpressPost(
      sort: { fields: [date], order: DESC }
      filter: { categories: { elemMatch: { name: { eq: $category } } } }
    ) {
      edges {
        node {
          ...BlogPostFields
        }
      }
    }
  }
`
