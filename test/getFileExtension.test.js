import getFileExtension from 'utils/getFileExtension'

const jpg = 'src/assets/img/example-file.jpg'
const webp = 'src/assets/img/example-file.webp'

describe('Retrieve the file extension', () => {
  it("when it's a JPG file", () => {
    expect(getFileExtension(jpg)).toBe('jpg')
  })

  it("when it's a WebP file", () => {
    expect(getFileExtension(webp)).toBe('webp')
  })
})
