import SpoilerButton from './SpoilerButton'

export default function QuillCustomToolbar() {
  return (
    <div className="ql-toolbar flex gap-2" id="toolbar">
      <div className="toolbar-group flex gap-1">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-strike" />
        <button className="ql-script" value="super" />
        <button className="ql-header" value="2" />
      </div>

      <div className="ql-separator border-l border-gray-300 h-full"></div>

      <div className="toolbar-group flex gap-1">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </div>

      <div className="ql-separator border-l border-gray-300 h-full"></div>

      <div className="toolbar-group flex gap-1">
        <button className="ql-link" />
        <button className="ql-blockquote" />
        <button className="ql-code" />
        <button className="ql-clean" />
        <SpoilerButton />
      </div>
    </div>
  )
}
