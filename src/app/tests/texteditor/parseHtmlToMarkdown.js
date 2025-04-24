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
    node.nodeName === 'SPAN' && node.classList.contains('spoiler'),
  replacement: (content) => `>!${content}!<`,
})

export default function parseHtmlToMarkdown(editorHtml) {
  if (!editorHtml) return ''
  const markdownString = turndownService.turndown(editorHtml)

  return markdownString
}
