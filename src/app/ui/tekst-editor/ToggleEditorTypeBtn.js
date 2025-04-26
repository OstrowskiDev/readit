import { useTextEditorContext } from '@/app/lib/context/TextEditorProvider'
import parseHtmlToMarkdown from '@/app/lib/text-editor/parseHtmlToMarkdown'

export function ToggleEditorTypeBtn() {
  const {
    toggleEditor,
    setToggleEditor,
    htmlString,
    setHtmlString,
    markdownString,
    setMarkdownString,
  } = useTextEditorContext()

  function handleToggleEditor() {
    if (toggleEditor === 'formated_text_editor') {
      const newHtmlString = parseMarkdownToHtml(markdownString) //create this function
      setHtmlString(newHtmlString)
      setToggleEditor('markdown_editor')
    } else if (toggleEditor === 'markdown_editor') {
      const newMarkdownString = parseHtmlToMarkdown(htmlString)
      setMarkdownString(newMarkdownString)
      setToggleEditor('markdown_editor')
    } else {
      console.error('Invalid toggleEditor value:', toggleEditor)
    }
  }

  return (
    <button
      className="toggle-editor-btn p-[6px] hover:bg-gray-300 rounded-full"
      type="button"
      onClick={handleToggleEditor}
    >
      {toggleEditor === 'markdown_editor'
        ? 'Change to Formatted Text Editor'
        : 'Change to Markdown Editor'}
    </button>
  )
}
