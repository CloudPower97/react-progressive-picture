import React from 'react'
import { shallow, mount } from 'enzyme'
import Picture from 'src/Picture'

describe('Picture', () => {
  describe('should render', () => {
    it('an img tag', () => {
      const picture = shallow(<Picture alt="" />)

      expect(picture).toMatchSnapshot()
    })

    it('an img tag with a placeholder', () => {
      const picture = shallow(
        <Picture src="image.jpg" placeholder="image-placeholder.jpg" alt="" />
      )

      expect(picture).toMatchSnapshot()
    })

    it('a picture tag', () => {
      const picture = shallow(
        <Picture
          sources={[
            {
              srcSet: 'image.webp',
              type: 'image/webp',
            },
            {
              srcSet: 'image.png',
              type: 'image/png',
            },
          ]}
          alt=""
        />
      )

      expect(picture).toMatchSnapshot()
    })

    it('a picture tag with placeholders', () => {
      const picture = shallow(
        <Picture
          sources={[
            {
              placeholder: 'image-placeholder.webp',
              srcSet: 'image.webp',
              type: 'image/webp',
            },
            {
              placeholder: 'image-placeholder.png',
              srcSet: 'image.png',
              type: 'image/png',
            },
          ]}
          alt=""
        />
      )

      expect(picture).toMatchSnapshot()
    })

    it('other props', () => {
      const picture = shallow(
        <Picture alt="That's nice" width="128" className="my-img-selector" id="test" />
      )

      expect(picture).toMatchSnapshot()
    })
  })

  describe('should initializes itself', () => {
    it('with default props', () => {
      const picture = mount(<Picture alt="" />)

      expect(picture.prop('alt')).toEqual('')
      expect(picture.prop('blur')).toEqual(10)
      expect(picture.prop('opacity')).toEqual(1)
      expect(picture.prop('grayscale')).toEqual(0)
      expect(picture.prop('delay')).toEqual(0)
      expect(picture.prop('transitionTime')).toEqual(750)
      expect(picture.prop('timingFunction')).toEqual('ease')
      expect(picture.prop('options')).toEqual({
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      })
    })
  })

  describe('should render placeholder', () => {
    it('if providing a placeholder', () => {
      const picture = shallow(
        <Picture alt="" src="image.jpeg" placeholder="image-placeholder.svg" />
      )

      expect(picture.find('img').prop('data-src')).toBe('image.jpeg')
      expect(picture.find('img').prop('src')).toBe('image-placeholder.svg')
    })

    it('if providing multiple placeholder attribute and different sources', () => {
      const picture = shallow(
        <Picture
          alt=""
          sources={[
            {
              placeholder: 'image-placeholder.webp',
              srcSet: 'image.webp',
              type: 'image/webp',
            },
            {
              placeholder: 'image-placeholder.jpg',
              srcSet: 'image.jpg',
              type: 'image/jpg',
            },
          ]}
        />
      )

      expect(
        picture
          .find('source')
          .first()
          .prop('data-srcset')
      ).toBe('image.webp')

      expect(
        picture
          .find('source')
          .first()
          .prop('srcSet')
      ).toBe('image-placeholder.webp')
    })

    it('if providing a single placeholder attribute and different sources', () => {
      const picture = shallow(
        <Picture
          alt=""
          sources={[
            {
              srcSet: 'image.webp',
              type: 'image/webp',
            },
            {
              srcSet: 'image.jpg',
              type: 'image/jpg',
            },
          ]}
          placeholder="image-placeholder.svg"
        />
      )

      expect(
        picture
          .find('source')
          .at(0)
          .prop('data-srcset')
      ).toBe('image.webp')

      expect(
        picture
          .find('source')
          .at(0)
          .prop('srcSet')
      ).toBe('image-placeholder.svg')

      expect(
        picture
          .find('source')
          .at(1)
          .prop('data-srcset')
      ).toBe('image.jpg')

      expect(
        picture
          .find('source')
          .at(1)
          .prop('srcSet')
      ).toBe('image-placeholder.svg')
    })
  })

  describe('should not render placeholder', () => {
    it('if not providing a placeholder', () => {
      const picture = shallow(<Picture alt="" src="image.jpg" />)

      expect(picture.find('img').prop('data-src')).toBeFalsy()
    })

    it('if providing different sources and not a placeholder', () => {
      const picture = shallow(
        <Picture
          alt=""
          sources={[
            {
              srcSet: 'image.webp',
              type: 'image/webp',
            },
            {
              srcSet: 'image.jpg',
              type: 'image/jpg',
            },
          ]}
        />
      )

      expect(
        picture
          .find('source')
          .first()
          .prop('data-srcset')
      ).toBeFalsy()
    })
  })
})
