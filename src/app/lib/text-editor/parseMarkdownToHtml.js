import MarkdownIt from 'markdown-it'
import { spoilerPlugin } from './markdownInPlugins/markdownItSpoilerPlugin'

const markdownParser = MarkdownIt()

markdownParser.renderer.rules.heading_open = function (tokens, idx) {
  return '<h2>'
}
markdownParser.renderer.rules.heading_close = function (tokens, idx) {
  return '</h2>'
}

markdownParser.renderer.rules.s_open = function () {
  return '<del>'
}
markdownParser.renderer.rules.s_close = function () {
  return '</del>'
}

markdownParser.use(subscriptPlugin)
markdownParser.use(spoilerPlugin)

export function parseMarkdownToHtml(markdownString) {
  return markdownParser.render(markdownString)
}

function subscriptPlugin(markdown) {
  const pattern = /\^\((.*?)\)/g

  markdown.core.ruler.push('subscript', function (state) {
    state.tokens.forEach((topLevelToken) => {
      if (topLevelToken.type !== 'inline') return

      topLevelToken.children.forEach((token) => {
        if (token.type === 'text' && pattern.test(token.content)) {
          token.content = token.content.replace(
            pattern,
            (match, p1) => `<sup>${p1}</sup>`,
          )
        }
      })
    })
  })
}

// state represents the parsed document as a JS object that mirrors the HTML tree structure
// state.tokens: tokens represent the document structure,
// they are JS objects representing parts of HTML tags
// token.type represents parts of an HTML tag structure:
// type === paragraph_open represents the opening paragraph tag <p>
// type === inline represents text and inline formatting inside tags
// type === paragraph_close represents the closing paragraph tag </p>

// state.src: the original document
// state.env: optional environment object

// token.type – specifies the type of token (the name of the HTML-like structure)
// token.tag – the name of the HTML tag associated with this token (e.g., 'p', 'strong', 'em', etc.)
// token.block – whether the token is block-level (true/false) (NOTE: only some parsers set .block, MarkdownIt does)
// token.children – if token.type === 'inline', the children representing text and inline formatting
// token.content – the textual content of the token (for inline text)
// token.attrs – HTML attributes in the form of an array [[name, value], ...] (e.g., [['href', 'https://...']])

// String.prototype.replace(pattern, (match, p1, p2, ..., offset, inputString) => {})
// p1, p2, etc., are the groups captured by ( ) in the regex, so in this case just one group p1
