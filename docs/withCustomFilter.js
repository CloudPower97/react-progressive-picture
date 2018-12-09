import React from 'react'
import Picture from 'src'

export const usingProps = () => (
  <Picture
    grayscale={1}
    opacity={0.5}
    placeholder="https://picsum.photos/800/400/?random"
    src="https://picsum.photos/800/400/?random"
  />
)
export const usingFilterProps = () => (
  <Picture
    filter="hue-rotate(95deg) brightness(.4) sepia(10) invert(10)"
    src="https://picsum.photos/800/400/?random"
  />
)
