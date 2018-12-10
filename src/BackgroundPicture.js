import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Observer from '@researchgate/react-intersection-observer'

export default class BackgroundPicture extends Component {
  static propTypes = {
    children: PropTypes.node,
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
  }

  // TODO: test this with Cypress
  /**
   * @param {IntersectionObserverEntry} target
   * @param {function} unobserve
   * @memberof Picture
   */
  handleIntersection = /* istanbul ignore next */ ({ isIntersecting, target }, unobserve) => {
    const { delay, placeholder } = this.props

    if (isIntersecting) {
      setTimeout(() => {
        if (placeholder) {
          target.style.backgroundImage = `url(${target.dataset.src})`
        }

        target.style.filter = 'none'
      }, delay)

      unobserve()
    }
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
    } = this.props

    return (
      <Observer {...options} onChange={this.handleIntersection}>
        <div
          style={{
            backgroundImage: `url(${placeholder || src})`,
            width: '100%',
            transition: `filter ${transitionTime}ms ${timingFunction}`,
            filter: filter || `blur(${blur}px) grayscale(${grayscale}) opacity(${opacity})`,
          }}
          data-src={placeholder ? src : null}>
          {children}
        </div>
      </Observer>
    )
  }
}
