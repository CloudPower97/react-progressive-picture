import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

/* eslint-disable */
global.IntersectionObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
}
