const path = require('path')
const markdownMagic = require('markdown-magic')

const config = {}
const callback = function(updatedContent, outputConfig) {
  console.log('all set!')
}

const docFiles = [
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

const markdownPaths = docFiles.map((file) => {
  return path.join(__dirname, `/site/content/docs/${file}`)
})

function markWithMagic(filePaths) {
  markdownMagic(filePaths, config, callback)
}

export default function makeMagic() {
  markWithMagic(markdownPaths)
}
