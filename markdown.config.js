const path = require('path')
const markdownMagic = require('markdown-magic')

const config = {}
const callback = function(updatedContent, outputConfig) {
  console.log('all set!')
}

const magicDocFiles = [
  'architecture.md',
  'editorial-workflow.md',
  'extending.md',
  'intro.md',
  'quick-start.md',
  'validation.md',
  'configuration.md',
  'contributor-guide.md',
  'customization.md',
  'test-drive.md'
]

magicDocFiles.map((file) => {
 const markdownPath = path.join(__dirname, '/', `/site/content/docs/${file}`)
 markdownMagic(markdownPath, config, callback)
})
