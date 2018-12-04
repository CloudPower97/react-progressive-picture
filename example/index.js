import React from 'react'
import { render } from 'react-dom'
import * as assets from 'assets'
import Picture from 'src'
import './style.css'

const App = () => {
  return (
    <>
      <section>
        <figure>
          <Picture alt="" src={assets.imageJpg} />
          <figcaption>A simple image tag will be rendered here</figcaption>
        </figure>
      </section>
      <section>
        <figure>
          <Picture alt="" grayscale={1} placeholder={assets.placeholderJpg} src={assets.imageJpg} />
          <figcaption>A simple image tag with a placeholder</figcaption>
        </figure>
      </section>
      <section>
        <figure>
          <Picture
            grayscale={1}
            opacity={0.5}
            transitionTime={500}
            alt=""
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
          <figcaption>A picture element tag with different placeholders based on type</figcaption>
        </figure>
      </section>
    </>
  )
}

render(<App />, document.getElementById('root'))
