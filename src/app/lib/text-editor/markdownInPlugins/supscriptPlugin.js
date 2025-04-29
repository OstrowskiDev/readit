export function supscriptPlugin(markdown) {
  const regex = /\^\((.*?)\)/g

  markdown.core.ruler.push('supscript', function (state) {
    state.tokens.forEach((topLevelToken) => {
      if (topLevelToken.type !== 'inline') return

      const newChildren = []

      topLevelToken.children.forEach((token) => {
        if (token.type !== 'text') {
          newChildren.push(token)
          return
        }

        let parsedString = token.content
        let lastIndex = 0
        let match
        regex.lastIndex = 0

        while ((match = regex.exec(parsedString)) !== null) {
          const matchStart = match.index
          const matchEnd = regex.lastIndex
          const supscriptText = match[1]

          if (matchStart > lastIndex) {
            const textToken = new state.Token('text', '', 0)
            textToken.content = parsedString.slice(lastIndex, matchStart)
            newChildren.push(textToken)
          }

          const supscriptOpen = new state.Token('supscript_open', 'sup', 1)
          newChildren.push(supscriptOpen)

          const supscriptContent = new state.Token('text', '', 0)
          supscriptContent.content = supscriptText
          newChildren.push(supscriptContent)

          const supscriptClose = new state.Token('supscript_close', 'sup', -1)
          newChildren.push(supscriptClose)

          lastIndex = matchEnd
        }

        if (lastIndex < parsedString.length) {
          const textToken = new state.Token('text', '', 0)
          textToken.content = parsedString.slice(lastIndex)
          newChildren.push(textToken)
        }
      })

      topLevelToken.children = newChildren
    })
  })
}
