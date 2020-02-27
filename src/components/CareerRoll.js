import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import SEO from "../components/seo/index";

class CareerRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: careers } = data.allMarkdownRemark;
    const careersSeo = careers.map(({ node: career }) => {
      return career.frontmatter.title;
    });

    return (
      <>
        <SEO title="Careers" keywords={careersSeo} />
        <div id="main">
          <div className="page-vacancy">
            <div className="container">
              <h1 className="h2 striped uppercase">
                Careers
                <span className="vacancy-count">{careers.length}</span>
              </h1>
              <div>
                <p>
                  Sparkybit is a leading Ukrainian software development company,
                  with a focus on fintech, open banking, banking technology, and
                  SME IT planning. It partners with small to mid-size enterprise
                  to deliver software solutions and expertise to speed time to
                  market, while also supporting the digital transformation
                  journey.
                </p>
              </div>
              <hr />
              {careers &&
                careers.map(({ node: career }) => (
                  <div className="vacancy-block" key={career.id}>
                    <div className="content-block">
                      <div className="vacancy-list">
                        <div className="vacancy-wrap-right">
                          <div className="vacancy-wrap-title">
                            <Link to={career.fields.slug}>
                              <h3 className="vacancy-title">
                                {career.frontmatter.title}
                              </h3>
                            </Link>
                            <div className="vacancy-location">
                              {career.frontmatter.cities.map(city => {
                                return (
                                  <span className="vacancy-city" key={city}>
                                    {city}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="about-project">
                            <h4 className="vacancy-about-title">
                              About project
                            </h4>
                            {career.frontmatter.description}
                          </div>
                        </div>
                      </div>
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
      query CareerRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "career-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(fromNow: true)
                featuredpost
                description
                cities
              }
              html
              htmlAst
            }
          }
        }
      }
    `}
    render={data => <CareerRoll data={data} />}
  />
);
