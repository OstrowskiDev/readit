import SpoilerButton from './SpoilerButton'

export default function QuillCustomToolbar() {
  return (
    <div id="toolbar">
      <button className="ql-header" value="2" />
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-strike" />
      <button className="ql-script" value="super" />

      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />

      <button className="ql-link" />
      <button className="ql-blockquote" />
      <button className="ql-code" />

      <button className="ql-clean" />

      <button className="ql-spoiler">
        <SpoilerButton />
      </button>
    </div>
  )
}
