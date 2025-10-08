export function spoilerPlugin(markdown) {
  const regex = /!>(.*?)<!/g

  markdown.core.ruler.push('spoiler', function (state) {
    state.tokens.forEach((topLevelToken) => {
      if (topLevelToken.type !== 'inline') return

      // iteracja po tokenach
      // jeśli token jest typu inline to jest szansa że któreś z jego children będzie tokenem typu text
      // w takim przypadku token.content może zawierać tekst z poszukiwanym patternem regex: !>treść spoilera<!
      // jeśli child token nie jest typu tekst (link, obraz etc) jest od razu dodawany do newChildren
      // jeśli jest typu tekst to zostaje sprawdzony czy posiada poszukiwany pattern
      // jeśli nie posiada patternu jest dodawany jako jeden token tekstowy do newChildren
      // jeśli posiada pattern to jest przekształcany na od 3 do 5 nowych tokenów w zależności od przypadku, tokeny są dodawane do newChildren
      // docelowy format: <mark class='spoiler'>ukryty tekst</mark>
      // 1) tekst poprzedzający <mark> // token tekstowy
      // 2) tag otwierajacy <mark> // token open mark
      // 3) zawartość tekstową wewnątrz tagu // token tekstowy
      // 4) tag zamykający </mark> // token close mark
      // 5) tekst znajdujacy się za spoilerem (jeśli istnieje) // token tekstowy

      const newChildren = []

      topLevelToken.children.forEach((token) => {
        if (token.type !== 'text') {
          newChildren.push(token)
          return
        }

        let parsedString = token.content
        let lastIndex = 0
        let match

        // resetuje wartość regex.lastIndex dla przypadków w których Obiekt regex został już wykorzystany podczas iteracji i .lastIndex może być inny niż 0
        regex.lastIndex = 0

        while ((match = regex.exec(parsedString)) !== null) {
          const matchStart = match.index //indeks początku dopasowania w tekście
          const matchEnd = regex.lastIndex //indeks końca dopasowania w tekście
          const spoilerText = match[1] //match[1] zwraca zawartość pierwszej grupy przechwytywania regex matcha,

          // Tekst przed spoilerem
          if (matchStart > lastIndex) {
            // new state.Token(type, tag, nesting)
            // nesting: 0 tag samodzielny, 1 tag otwierający, -1 tag zamykający
            const textToken = new state.Token('text', '', 0)
            textToken.content = parsedString.slice(lastIndex, matchStart)
            newChildren.push(textToken)
          }

          // Otwierający tag
          const spoilerOpen = new state.Token('mark_open', 'mark', 1)
          spoilerOpen.attrs = [['class', 'spoiler']]
          newChildren.push(spoilerOpen)

          // Tekst spoilera
          const spoilerContent = new state.Token('text', '', 0)
          spoilerContent.content = spoilerText
          newChildren.push(spoilerContent)

          // Zamykający tag
          const spoilerClose = new state.Token('mark_close', 'mark', -1)
          newChildren.push(spoilerClose)

          lastIndex = matchEnd
        }

        // Tekst po ostatnim spoilerze
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
