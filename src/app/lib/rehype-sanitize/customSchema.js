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
    'spoiler',
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
    spoiler: ['className'],
  },
}

export default customSchema
