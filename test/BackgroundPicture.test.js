import React from 'react'
import { shallow, mount } from 'enzyme'
import { BackgroundPicture } from 'src'

describe('BackgroundPicture', () => {
  describe('should render', () => {
    const backgroundPicture = <BackgroundPicture src="image.jpg" />

    it('without children', () => {
      expect(shallow(backgroundPicture)).toMatchSnapshot()
    })

    it('with children', () => {
      expect(
        shallow(backgroundPicture).setProps({ children: <h1>Nice background picture!</h1> })
      ).toMatchSnapshot()
    })
  })

  describe('should initializes itself', () => {
    it('with default props', () => {
      const backgroundPicture = mount(<BackgroundPicture src="image.jpg" />)

      expect(backgroundPicture.prop('blur')).toEqual(10)
      expect(backgroundPicture.prop('opacity')).toEqual(1)
      expect(backgroundPicture.prop('grayscale')).toEqual(0)
      expect(backgroundPicture.prop('delay')).toEqual(0)
      expect(backgroundPicture.prop('transitionTime')).toEqual(750)
      expect(backgroundPicture.prop('timingFunction')).toEqual('ease')
    })
  })

  describe('should handle placeholder', () => {
    const backgroundPicture = shallow(
      <BackgroundPicture placeholder="image-placeholder.jpg" src="image.jpg" />
    )

    it('hence the element should have a `data-src` with the value of the src prop', () => {
      expect(backgroundPicture.childAt(0).prop('data-src')).toBe('image.jpg')
    })

    it('hence the element should have a `background-image` with an url value of the given placeholder prop', () => {
      expect(backgroundPicture).toMatchSnapshot()
    })
  })
})
