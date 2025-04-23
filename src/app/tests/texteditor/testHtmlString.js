const testHtmlString = `
<h1>Nagłówek 1</h1>
<h2>Nagłówek 2</h2>
<p>To jest <sup>indeks górny</sup>,</p>
<p>a to <span class="spoiler">spoiler którego nie widać</span>.</p>
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
<table>
<thead>
<tr><th>Kolumna 1</th><th>Kolumna 2</th></tr>
</thead>
<tbody>
<tr><td>A</td><td>B</td></tr>
<tr><td>C</td><td>D</td></tr>
</tbody>
</table>
`
export default testHtmlString
