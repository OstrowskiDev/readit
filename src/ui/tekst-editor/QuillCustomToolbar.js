import { useState } from 'react'
import CrossedButton from './CrossedButton'
import SpoilerButton from './SpoilerButton'
import { ToggleEditorTypeBtn } from './ToggleEditorTypeBtn'

export default function QuillCustomToolbar() {
  const [toggleMenu, setToggleMenu] = useState({ display: 'none' })

  function onClick() {
    if (toggleMenu.display === 'none') {
      setToggleMenu({ display: 'block' })
    } else {
      setToggleMenu({ display: 'none' })
    }
  }
  return (
    <div className="container flex">
      <div className="ql-toolbar flex gap-2" id="toolbar">
        <div className="toolbar-group flex gap-1">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <CrossedButton />
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

        <button type="button" onClick={onClick}>
          ...
        </button>

        <div className="relative" style={toggleMenu}>
          <div className="absolute top-9 flex flex-col p-1 z-50 border-rose-500 bg-white">
            <button className="ql-bold" />
            <button className="ql-italic" />
          </div>
        </div>
      </div>
      <ToggleEditorTypeBtn />
    </div>
  )
}
