import 'react-quill/dist/quill.snow.css'
import TurndownService from 'turndown'

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
})

turndownService.addRule('superscript', {
  filter: 'sup',
  replacement: (content) => `^(${content})`,
})

turndownService.addRule('spoiler', {
  filter: (node) =>
    node.nodeName === 'MARK' && node.classList.contains('spoiler'),
  replacement: (content) => `!>${content}<!`,
})

turndownService.addRule('strikethrough', {
  filter: 'del',
  replacement: (content) => `~~${content}~~`,
})

export function parseHtmlToMarkdown(editorHtml) {
  if (!editorHtml) return ''
  const markdownString = turndownService.turndown(editorHtml)

  return markdownString
}
