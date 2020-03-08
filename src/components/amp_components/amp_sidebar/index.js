import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import config from "../../../../config/website"

export default props => {
  const menu = useStaticQuery(graphql`
    query {
      wordpressWpApiMenusMenusItems(slug: { eq: "global-navigation" }) {
        id
        items {
          title
          object_id
          object_slug
        }
      }
    }
  `)
  return (
    <>
      <amp-sidebar
        id="sidebar-right"
        class="sample-sidebar"
        layout="nodisplay"
        side="right"
      >
        <button on="tap:sidebar-right.close">
          <i class="fa fa-times fa-3x" aria-hidden="true"></i>
        </button>
        <ul className="side-menu">
          {menu.wordpressWpApiMenusMenusItems.items.map(menuItem => {
            return (
              <li className="menu-item">
                <Link
                  key={menuItem.object_id}
                  to={`/${config.ampPrefix}/${menuItem.object_slug}`}
                  activeClassName="active"
                  //partiallyActive={true}
                >
                  {menuItem.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </amp-sidebar>
      <div id="target-element-right fa-3x"></div>
    </>
  )
}
