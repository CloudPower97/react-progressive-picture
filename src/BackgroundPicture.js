import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Observer from '@researchgate/react-intersection-observer'
import 'vendor/modernizr.min.js'

export default class BackgroundPicture extends Component {
  static propTypes = {
    children: PropTypes.node,
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
         * The type attribute specifies a MIME type for the resource URL(s) in the <source> element's srcset attribute.
         * If the user agent does not support the given type, the <source> element is skipped.
         */
        type: PropTypes.string,
      })
    ),
    /** Placeholder image to show until the src loads */
    placeholder: PropTypes.string,
    /** The image URL */
    src: PropTypes.string.isRequired,
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
    /**
     * The filter CSS property to applies graphical effects.
     * Read more here: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
     **/
    filter: PropTypes.string,
    /** Time in milliseconds before src image is loaded */
    delay: PropTypes.number,
    repeat: (props, propName, componentName) => {
      if (
        !/(?:repeat-x|repeat-y)|(?:repeat|space|round|no-repeat){1,2}|(?:inherit|initial|unset)/.test(
          props[propName]
        )
      ) {
        return new Error(`Invalid prop \`${propName}\` supplied to ${componentName}.`)
      }
    },
    attachment: PropTypes.oneOf(['scroll', 'fixed', 'local', 'inherit', 'initial', 'unset']),
    position: PropTypes.string,
    size: function(props, propName, componentName) {
      if (
        !/(?:contain|cover|auto)|(?:\d+(?:px|%|rem|em|vw|vh|vmin|vmax|cm|mm|in|pc|pt)|(?:inherit|initial|unset))/.test(
          props[propName]
        )
      ) {
        return new Error(`Invalid prop \`${propName}\` supplied to ${componentName}.`)
      }
    },
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
    transitionTime: 750,
    timingFunction: 'ease',
    blur: 10,
    opacity: 1,
    grayscale: 0,
    delay: 0,
    attachment: 'initial',
    position: 'initial',
    size: 'initial',
    repeat: 'initial',
  }

  // TODO: test this with Cypress
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
        }

        target.style.filter = 'none'
      }, delay)

      unobserve()
    }
  }

  // TODO: test this with Cypress
  /**
   * Swap the placeholder image with the real one
   * @param {HTMLElement} target
   * @memberof Picture
   */
  swapSources = /* istanbul ignore next */ target => {
    target.style.backgroundImage = `url(${target.dataset.src})`
  }

  // TODO: test this with Cypress
  getPlaceholder = /* istanbul ignore next */ (placeholder, sources) => {
    if (sources) {
      const placeholderSource = sources.find(({ placeholder }) => placeholder)

      return placeholderSource ? placeholderSource.placeholder : placeholder
    }

    return placeholder
  }

  // TODO: find a way to test this
  getSource = /* istanbul ignore next */ (src, sources) => {
    if (sources) {
      if (window.Modernizr.webp) {
        const webP = sources.find(({ type }) => type === 'image/webp')

        return webP ? webP.srcSet : src
      }
    }

    return src
  }

  render() {
    const {
      placeholder,
      src,
      children,
      options,
      filter,
      blur,
      grayscale,
      opacity,
      transitionTime,
      timingFunction,
      attachment,
      position,
      repeat,
      size,
      sources,
      ...props
    } = this.props

    delete props.delay

    return (
      <Observer {...options} onChange={this.handleIntersection}>
        <div
          {...props}
          style={{
            backgroundSize: size,
            backgroundAttachment: attachment,
            backgroundPosition: position,
            backgroundRepeat: repeat,
            backgroundImage: `url(${this.getPlaceholder(placeholder, sources) ||
              this.getSource(src, sources)})`,
            width: '100%',
            transition: `filter ${transitionTime}ms ${timingFunction}`,
            filter: filter || `blur(${blur}px) grayscale(${grayscale}) opacity(${opacity})`,
            ...props.style,
          }}
          data-src={
            this.getPlaceholder(placeholder, sources) ? this.getSource(src, sources) : null
          }>
          {children}
        </div>
      </Observer>
    )
  }
}
