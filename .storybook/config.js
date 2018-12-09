import { addDecorator, configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

const getStories = require.context('../docs')

addDecorator(
  withOptions({
    name: 'React Progressive Picture',
    url: 'https://github.com/CloudPower97/react-progressive-picture',
    showAddonPanel: false,
  })
)

function loadStories() {
  getStories.keys().forEach(filename => getStories(filename))
}

configure(loadStories, module)
