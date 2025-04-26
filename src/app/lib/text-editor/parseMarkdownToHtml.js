import MarkdownIt from 'markdown-it'

const markdownParser = MarkdownIt()

markdownParser.renderer.rules.heading_open = function (tokens, idx) {
  return '<h2>'
}
markdownParser.renderer.rules.heading_close = function (tokens, idx) {
  return '</h2>'
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
            (match, p1) => `<sub>${p1}</sub>`,
          )
        }
      })
    })
  })
}

// state represents parsed document as JS object that represents HTML tree
// state.tokens: tokens represents structure of the document,
// they are JS objects that represent parts of html tags
// token.type represents parts of html tag structure:
// type === paragraph_open represents paragraph opening tag <p>
// type === inline represents text and inline formating inside tags
// type === paragraph_close represents paragraph closing tag </p>

// state.src: oryginal document
// state.env: optional env

// token.type - określa rodzaj tokena (nazwa typu HTML-owej struktury)
// token.tag - nazwa tagu HTML powiązanego z tym tokenem (np. 'p', 'strong', 'em', itd.)
// token.block - czy token jest blokowy (true/false) (UWAGA: tylko niektóre parsery ustawiają .block, MarkdownIt to robi)
// token.children - jeśli token.type === 'inline', dzieci reprezentujące tekst i formatowanie inline
// token.content - treść tekstowa tokena (dla inline text)
// token.attrs - atrybuty HTML w formie tablicy [[name, value], ...] (np. [['href', 'https://...']])

// String.prototype.replace(pattern, (match, p1, p2, ..., offset, inputString) => {})
// p1, p2 and so on are groups found in ( ) by regex, so in this case just one group p1

function spoilerPlugin(markdown) {
  const pattern = />!(.*?)!</g
  markdown.core.ruler.push('spoiler', function (state) {
    state.tokens.forEach((topLevelToken) => {
      if (topLevelToken.type !== 'inline') return
      topLevelToken.children.forEach((token) => {
        if (token.type === 'text' && pattern.test(token.content)) {
          token.content = token.content.replace(
            pattern,
            (match, p1) => `<spoiler class="spoiler">${p1}</spoiler>`,
          )
        }
      })
    })
  })
}
