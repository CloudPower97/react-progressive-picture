import React from 'react'
import Picture from 'src'

import { imageJpg } from 'assets'

const styles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}

export const withDelay = () => <Picture delay={1500} src={imageJpg} />
export const withThreshold = () => (
  <div style={styles}>
    <div
      style={{
        minHeight: '100vh',
        textAlign: 'center',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <h2>The image will lazy load only if it fully enters the viewport.</h2>
    </div>
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Picture
        src="https://picsum.photos/800/400/?random"
        options={{
          threshold: 1.0,
        }}
      />
    </div>
  </div>
)
