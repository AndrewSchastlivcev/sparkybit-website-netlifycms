// Slightly modified react-responsive-picture
// https://github.com/braposo/react-responsive-picture
import React, { Component } from "react"

const isPictureFillNeeded =
  typeof window !== "undefined" &&
  (!window.HTMLPictureElement || !("sizes" in document.createElement("img")))
const Picturefill = isPictureFillNeeded ? require("picturefill") : function() {}

export default class Picture extends Component {
  constructor(props) {
    super(props)
    this.imageEl = null
  }

  static defaultProps = {
    src:
      "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
  }

  componentDidMount() {
    Picturefill({
      elements: [this.imageEl],
    })
  }

  componentDidUpdate(prevProps) {
    Picturefill({
      elements: [this.imageEl],
    })
  }

  renderSources() {
    const { sources } = this.props

    if (sources == null) {
      return null
    }

    const mappedSources = sources.map((source, index) => {
      if (source.srcSet == null) {
        return null
      }

      return (
        <source
          key={`sources-${index}`}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
        />
      )
    })

    return mappedSources
  }

  renderImage(props, skipSizes = false) {
    const { alt = "", src, sizes, ...rest } = props

    // Adds sizes props if sources isn't defined
    const sizesProp = skipSizes ? null : { sizes }

    return (
      <img
        ref={el => (this.imageEl = el)}
        alt={alt}
        src={src}
        {...sizesProp}
        {...rest}
      />
    )
  }

  render() {
    const { sources, ...rest } = this.props
    if (sources != null) {
      return (
        <picture ref={el => (this.pictureEl = el)}>
          {this.renderSources()}
          {this.renderImage(rest, true)}
        </picture>
      )
    }

    return this.renderImage(rest)
  }
}
