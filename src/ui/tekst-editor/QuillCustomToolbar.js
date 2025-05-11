import { useEffect, useRef, useState } from 'react'
import CrossedButton from './CrossedButton'
import SpoilerButton from './SpoilerButton'
import { ToggleEditorTypeBtn } from './ToggleEditorTypeBtn'

export default function QuillCustomToolbar() {
  const [toggleMenu, setToggleMenu] = useState({ display: 'none' })

  const items = [
    { class: 'bold' },
    { class: 'italic' },
    { class: 'crossed' },
    { class: 'script', value: 'super' },
    { class: 'header' },
    { class: 'list', value: 'ordered' },
    { class: 'list', value: 'bullet' },
    { class: 'link' },
    { class: 'blockquote' },
    { class: 'code' },
    { class: 'clean' },
    { class: 'spoiler' },
  ]

  const containerRef = useRef(null)
  const [toolbarItems, setToolbarItems] = useState(items)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleWidthChange)
    if (containerRef.current) resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [containerRef])

  const isToggleMenuBtnVisible = containerRef.current?.offsetWidth < 685

  function handleWidthChange() {
    const containerWidth = containerRef.current?.offsetWidth || 0
    let total = 0
    const newToolbar = []

    items.forEach((item) => {
      const buttonWidth = 32
      if (total + buttonWidth < containerWidth - 300) {
        total += buttonWidth
        newToolbar.push({ ...item, location: 'toolbar' })
      } else {
        newToolbar.push({ ...item, location: 'menu' })
      }
    })
    setToolbarItems(newToolbar)
  }

  function onClick() {
    if (toggleMenu.display === 'none') {
      setToggleMenu({ display: 'flex' })
    } else {
      setToggleMenu({ display: 'none' })
    }
  }

  function renderButton(item, location = 'toolbar', key) {
    const shouldShow = item.location === location ? 'block' : 'none'
    const commonProps = { key, display: shouldShow }

    switch (item.class) {
      case 'crossed':
        return <CrossedButton {...commonProps} />
      case 'spoiler':
        return <SpoilerButton {...commonProps} />
      default:
        return (
          <button
            className={`ql-${item.class}`}
            value={item?.value}
            key={key}
            style={{ display: shouldShow }}
          />
        )
    }
  }

  return (
    <div className="toolbar-container flex" ref={containerRef}>
      <div className="ql-toolbar relative flex gap-2" id="toolbar">
        <div className="toolbar-group flex gap-1">
          {toolbarItems.map((item, i) => renderButton(item, 'toolbar', i))}

          {isToggleMenuBtnVisible && (
            <button
              className="px-2 py-1 bg-gray-300"
              type="button"
              onClick={onClick}
            >
              ...
            </button>
          )}
        </div>

        <div
          className="toolbar-group absolute right-[-20px] top-full flex-col mt-1 bg-white border shadow p-2 flex z-10"
          style={toggleMenu}
        >
          {toolbarItems.map((item, i) => renderButton(item, 'menu', i))}
        </div>
      </div>
      <ToggleEditorTypeBtn />
    </div>
  )
}
