const path = require('path')
const markdownMagic = require('markdown-magic')

const config = {}
const callback = function(updatedContent, outputConfig) {
  console.log('all set!')
}

const markdownPath = path.join(__dirname, '/', '/site/content/docs/architecture.md')
markdownMagic(markdownPath, config, callback)
