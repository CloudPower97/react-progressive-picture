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
  })

  describe('should initializes itself', () => {
    it('with default props', () => {
      const picture = mount(<Picture alt="" />)

      expect(picture.prop('alt')).toEqual('')
      expect(picture.prop('blur')).toEqual(10)
      expect(picture.prop('opacity')).toEqual(1)
      expect(picture.prop('grayscale')).toEqual(0)
      expect(picture.prop('transitionTime')).toEqual(750)
      expect(picture.prop('timingFunction')).toEqual('ease')
    })
  })
})
