import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
//import config from "../../../../config/website"

export default props => {
  return (
    <div>
      <amp-lightbox id="my-lightbox" layout="nodisplay">
        <div class="lightbox" role="button" tabindex="0">
          <form
            method="post"
            action-xhr="https://example.com/subscribe"
            target="_top"
          >
            <fieldset>
              <label>
                <span>Name:</span>
                <input type="text" name="name" required />
              </label>
              <label>
                <span>Phone:</span>
                <input type="text" name="phone" required />
              </label>
              <label>
                <span>Email:</span>
                <input type="email" name="email" required />
              </label>
              <div className="recaptcha">Recaptcha</div>
              <textarea placeholder="placeholder"></textarea>
              <input className="submit btn" type="submit" value="Subscribe" />
            </fieldset>
            <div submit-success>
              <template type="amp-mustache">Subscription successful!</template>
            </div>
            <div submit-error>
              <template type="amp-mustache">Subscription failed!</template>
            </div>
          </form>
        </div>
      </amp-lightbox>
    </div>
  )
}
