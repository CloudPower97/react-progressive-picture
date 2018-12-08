import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getFileExtension from './utils/getFileExtension'
import Observer from '@researchgate/react-intersection-observer'

export default class Picture extends Component {
  static propTypes = {
    /** The array of source objects specifies multiple media resources for the <picture>*/
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * A list of one or more strings separated by commas indicating a set of possible images
         * represented by the source for the browser to use.
         * The browser chooses the most adequate image to display at a given point of time.
         */
        srcSet: PropTypes.string.isRequired,
        /** Placeholder image to show until the srcSet loads */
        placeholder: PropTypes.string,
        /**
         * The media attribute specifies a media condition (similar to a media query)
         * that the user agent will evaluate for each <source> element.
         * If the media condition evaluates to false, its <source> element is skipped
         **/
        media: PropTypes.string,
        /**
         * The type attribute specifies a MIME type for the resource URL(s) in the <source> element's srcset attribute.
         * If the user agent does not support the given type, the <source> element is skipped.
         */
        type: PropTypes.string,
      })
    ),
    /** Placeholder image to show until the src loads */
    placeholder: PropTypes.string,
    /** The image URL */
    src: PropTypes.string,
    /** Defines an alternative text description of the image. */
    alt: PropTypes.string.isRequired,
    /** Sizes attribute to be used with src for determing best image for user's viewport. */
    sizes: PropTypes.string,
    /** Time in millisecond to transition the effects */
    transitionTime: PropTypes.number,
    /** Timing function to use for the effects */
    timingFunction: PropTypes.string,
    /** Initial value for the blur filter */
    blur: PropTypes.number,
    /** Initial value for the grayscale filter */
    grayscale: PropTypes.number,
    /** Initial value for the opacity filter */
    opacity: PropTypes.number,
    /** Time in milliseconds before src image is loaded */
    delay: PropTypes.number,
    /**
     * react-intersection-observer options: https://github.com/researchgate/react-intersection-observer#options
     * N.B. You will not be able to provide a custom onChange function
     **/
    options: PropTypes.shape({
      /**
       * The element that is used as the viewport for checking visibility of the target.
       * Can be specified as string for selector matching within the document.
       * Defaults to the browser viewport if not specified or if null.
       */
      root: PropTypes.oneOfType(
        [PropTypes.string].concat(
          typeof HTMLElement === 'undefined' ? [] : PropTypes.instanceOf(HTMLElement)
        )
      ),
      /**
       * Margin around the root. Can have values similar to the CSS margin property,
       * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
       * If the root element is specified, the values can be percentages.
       * This set of values serves to grow or shrink each side of the root element's
       * bounding box before computing intersections.
       * Defaults to all zeros.
       */
      rootMargin: PropTypes.string,
      /**
       * Either a single number or an array of numbers which indicate at what percentage
       * of the target's visibility the observer's callback should be executed.
       * If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5.
       * If you want the callback run every time visibility passes another 25%,
       * you would specify the array [0, 0.25, 0.5, 0.75, 1].
       * The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
       * A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
       */
      threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
      /**
       * Controls whether the element should stop being observed by its IntersectionObserver instance.
       * Defaults to false.
       */
      disabled: PropTypes.bool,
    }),
  }

  static defaultProps = {
    alt: '',
    transitionTime: 750,
    timingFunction: 'ease',
    blur: 10,
    opacity: 1,
    grayscale: 0,
    delay: 0,
  }

  // We test this with Cypress
  /**
   * @param {IntersectionObserverEntry} target
   * @param {function} unobserve
   * @memberof Picture
   */
  handleIntersection = /* istanbul ignore next */ ({ isIntersecting, target }, unobserve) => {
    const { delay, placeholder, sources } = this.props

    if (isIntersecting) {
      setTimeout(() => {
        if (placeholder || (sources && Object.keys(...sources).includes('placeholder'))) {
          this.swapSources(target)
        } else {
          const image = target.querySelector('img') || target

          image.style.filter = 'blur(0.1px)'
        }
      }, delay)

      unobserve()
    }
  }

  // We test this with Cypress
  /**
   * Swap the placeholder image with the real one
   * @param {HTMLElement} target
   * @memberof Picture
   */
  swapSources /* istanbul ignore next */ = target => {
    this.removeEffects(target, target.src)

    if (target.querySelector('img')) {
      const source = target.querySelector(
        `source[srcset$="${getFileExtension(target.querySelector('img').currentSrc)}"]`
      )

      if (source) {
        source.srcset = source.dataset.srcset
      } else {
        /** Apparently <source>'s are not immediately appended to the DOM on a slow connection */
        /** This is to make sure to swap the images as soon as the correct <source> is in the DOM */
        new MutationObserver(([mutation], observer) => {
          const { target: mutationTarget } = mutation

          const source = mutationTarget
            .closest('picture')
            .querySelector(
              `source[srcset$="${getFileExtension(target.querySelector('img').currentSrc)}"]`
            )

          source.srcset = source.dataset.srcset

          observer.disconnect()
        }).observe(target, {
          attributes: true,
          subtree: true,
        })
      }
    } else {
      target.src = target.dataset.src
    }
  }

  //  We test this with Cypress
  removeEffects = /* istanbul ignore next */ (target, originalSrc) => {
    const { grayscale, opacity, blur } = this.props

    const image = target.querySelector('img') || target

    image.onload = () => {
      image.style.filter = 'blur(0.1px)'
    }

    image.onerror = () => {
      /** This is to swap back the placeholder image as the source */
      image.src = originalSrc

      /** This is to override the style applied by onload */
      setTimeout(() => {
        image.style.filter = `blur(${blur}px) grayscale(${grayscale}) opacity(${opacity})`
      }, 0)
    }
  }

  renderSources = () => {
    const { placeholder, sources } = this.props

    return sources.map(({ srcSet, placeholder: sourcePlaceholder, media, type }, index) => (
      <source
        key={`sources-${index}`}
        srcSet={placeholder || sourcePlaceholder || srcSet}
        media={media}
        type={type}
        data-srcset={placeholder || sourcePlaceholder ? srcSet : null}
      />
    ))
  }

  renderImage = (
    {
      alt,
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
  ) => {
    // Adds sizes props if sources isn't defined
    const sizesProp = skipSizes ? null : { sizes }

    delete props.options
    delete props.delay

    return (
      <img
        alt={alt}
        src={placeholder || src}
        data-src={placeholder ? src : null}
        {...sizesProp}
        {...props}
        style={{
          filter: `blur(${blur}px) grayscale(${grayscale}) opacity(${opacity})`,
          transition: `filter ${transitionTime}ms ${timingFunction}`,
        }}
      />
    )
  }

  render() {
    const { sources, options, ...props } = this.props

    let component = this.renderImage(props)

    if (sources) {
      component = (
        <picture>
          {this.renderSources()}
          {this.renderImage(props, true)}
        </picture>
      )
    }

    return (
      <Observer {...options} onChange={this.handleIntersection}>
        {component}
      </Observer>
    )
  }
}
