const customSchema = {
  tagNames: [
    'h2',
    'br',
    'hr',
    'a',
    'strong',
    'em',
    'del',
    'code',
    'p',
    'sup',
    'ul',
    'li',
    'ol',
    'blockquote',
    'pre',
    'mark',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tfoot',
    'tr',
  ],
  attributes: {
    a: ['href'],
    mark: ['className'],
  },
}

export default customSchema
