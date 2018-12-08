/**
 * Given an URI, it returns the extension of the file
 * @param {String} file The URI
 * @return {String} The extension of the file.
 * @example
 *  // returns .jpg
 * getFileExtension('src/assets/img/example-file.jpg')
 */
const getFileExtension = file => file.split('.').pop()

export default getFileExtension
