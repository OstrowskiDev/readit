const testHtmlString = `
<h2>Nagłówek</h2>
<p>To jest <sup>indeks górny</sup>,</p>
<p>a to <spoiler class="spoiler">spoiler którego nie widać</spoiler>.</p>
<p><strong>Pogrubienie</strong><br>
<em>Kursywa</em><br>
<del>Przekreślenie</del><br>
<code>Kod inline</code></p>
<p><a href="https://example.com">Link</a></p>
<hr>
<p><strong>Lista wypunktowana:</strong></p>
<ul>
<li>Element listy 1</li>
<li>Element listy 2
<ul>
<li>Zagnieżdżony element</li>
</ul>
</li>
</ul>
<p><strong>Lista numerowana:</strong></p>
<ol>
<li>Element 1</li>
<li>Element 2</li>
</ol>
<blockquote>
<p>Cytat blokowy</p>
</blockquote>
<pre><code class="language-js">console.log('Kod blokowy');
</code></pre>
`
export default testHtmlString
