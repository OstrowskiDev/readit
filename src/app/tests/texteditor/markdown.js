const testMarkdown = `
# Nagłówek 1

## Nagłówek 2

To jest ^(indeks górny), 

a to >!spoiler którego nie widać!<.

**Pogrubienie**  
*Kursywa*  
~~Przekreślenie~~  
__Podkreślenie__ (nieobsługiwane natywnie w Markdown)  
\`Kod inline\`

[Link](https://example.com)

---

**Lista wypunktowana:**
- Element listy 1
- Element listy 2
  - Zagnieżdżony element

**Lista numerowana:**
1. Element 1
2. Element 2

> Cytat blokowy

\`\`\`js
console.log('Kod blokowy');
\`\`\`

| Kolumna 1 | Kolumna 2 |
|-----------|-----------|
| A         | B         |
`

export default testMarkdown
