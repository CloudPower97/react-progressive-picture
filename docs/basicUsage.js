import React from 'react'
import Picture from 'src'

import { imageJpg, imageWebp } from 'assets'

export const image = () => <Picture src="https://picsum.photos/800/400/?random" />
export const picture = () => (
  <Picture
    sources={[
      {
        srcSet: imageWebp,
        type: 'image/webp',
      },
      {
        srcSet: imageJpg,
        type: 'image/jpg',
      },
    ]}
  />
)
