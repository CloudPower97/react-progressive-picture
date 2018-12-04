import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getFileExtension from './utils/getFileExtension'

export default class Picture extends Component {
  static propTypes = {
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        srcSet: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        media: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    placholder: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    sizes: PropTypes.string,
    transitionTime: PropTypes.number,
    timingFunction: PropTypes.string,
    blur: PropTypes.number,
    grayscale: PropTypes.number,
    opacity: PropTypes.opacity,
  }

  static defaultProps = {
    alt: '',
    transitionTime: 750,
    timingFunction: 'ease',
    blur: 10,
    opacity: 1,
    grayscale: 0,
  }

  componentDidMount() {
    const { sources } = this.props
    /* istanbul ignore next line */
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            if (sources) {
              const source = target.parentNode.querySelector(
                `source[srcset$="${getFileExtension(target.currentSrc)}"]`
              )

              source.srcset = source.dataset.srcset
            } else {
              target.src = target.dataset.src
            }

            target.onload = () => {
              target.style.filter = 'blur(0.1px)'
            }

            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      }
    )

    observer.observe(this._img)
  }

  renderSources() {
    const { sources } = this.props

    return sources.map(({ srcSet, placeholder, media, type }, index) => (
      <source
        key={`sources-${index}`}
        srcSet={placeholder || srcSet}
        media={media}
        type={type}
        data-srcset={srcSet}
      />
    ))
  }

  renderImage(
    {
      alt = '',
      src,
      placeholder,
      sizes,
      blur,
      opacity,
      grayscale,
      transitionTime,
      timingFunction,
      ...props
    },
    skipSizes = false
  ) {
    // Adds sizes props if sources isn't defined
    const sizesProp = skipSizes ? null : { sizes }

    return (
      <img
        alt={alt}
        src={placeholder || src}
        data-src={src}
        {...sizesProp}
        {...props}
        ref={img => (this._img = img)}
        style={{
          filter: `blur(${blur}px) grayscale(${grayscale}) opacity(${opacity})`,
          transition: `filter ${transitionTime}ms ${timingFunction}`,
        }}
      />
    )
  }

  render() {
    const { sources, ...props } = this.props

    if (sources) {
      return (
        <picture>
          {this.renderSources()}
          {this.renderImage(props, true)}
        </picture>
      )
    }

    return this.renderImage(props)
  }
}
