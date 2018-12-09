import React from 'react'
import Picture from 'src'

import * as assets from 'assets'

export const singleSourceAndPlaceholder = () => (
  <Picture src={assets.imageJpg} placeholder={assets.placeholderJpg} />
)

export const multiplePlaceholder = () => (
  <Picture
    sources={[
      {
        placeholder: assets.placeholderWebp,
        srcSet: assets.imageWebp,
        type: 'image/webp',
      },
      {
        placeholder: assets.placeholderJpg,
        srcSet: assets.imageJpg,
        type: 'image/jpg',
      },
    ]}
  />
)

export const multiplePlaceholderAndSingleSource = () => (
  <Picture
    sources={[
      {
        srcSet: assets.imageWebp,
        type: 'image/webp',
      },
      {
        srcSet: assets.imageJpg,
        type: 'image/jpg',
      },
    ]}
    placeholder={assets.placeholderSvg}
  />
)
