import { storiesOf } from '@storybook/react'
import { image, picture } from './basicUsage'
import {
  singleSourceAndPlaceholder,
  multiplePlaceholder,
  multiplePlaceholderAndSingleSource,
} from './withPlaceholder'
import { usingProps, usingFilterProps } from './withCustomFilter'
import { withDelay, withThreshold } from './withOptions'

storiesOf('Picture', module)
  .add('Basic use', image)
  .add('With different sources', picture)
  .add('With a single source and a placeholder', singleSourceAndPlaceholder)
  .add('With multiple sources and multiple placeholders', multiplePlaceholder)
  .add('With multiple sources and a single placeholder', multiplePlaceholderAndSingleSource)
  .add('Using default filter with props', usingProps)
  .add('Specifying custom CSS filter', usingFilterProps)
  .add('With a delay', withDelay)
  .add('With a threshold', withThreshold)
