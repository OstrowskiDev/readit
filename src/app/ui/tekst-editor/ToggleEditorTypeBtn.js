import { useTextEditorContext } from '@/app/lib/context/TextEditorProvider'
import { parseHtmlToMarkdown } from '@/app/lib/text-editor/parseHtmlToMarkdown'
import { parseMarkdownToHtml } from '@/app/lib/text-editor/parseMarkdownToHtml'

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
      const newMarkdownString = parseHtmlToMarkdown(htmlString)
      setMarkdownString(newMarkdownString)
      setToggleEditor('markdown_editor')
    } else if (toggleEditor === 'markdown_editor') {
      const newHtmlString = parseMarkdownToHtml(markdownString)
      setHtmlString(newHtmlString)
      setToggleEditor('formated_text_editor')
    } else {
      console.error('Invalid toggleEditor value:', toggleEditor)
    }
  }

  const isMarkdown = toggleEditor === 'markdown_editor'

  return (
    <button
      className={`toggle-editor-btn ${
        isMarkdown ? 'min-w-[240px]' : ' min-w-[210px]'
      } h-[32px] px-[6px] ml-auto text-gray-600 text-sm hover:bg-gray-300 rounded-full`}
      type="button"
      onClick={handleToggleEditor}
    >
      {isMarkdown
        ? 'Change to Formatted Text Editor'
        : 'Change to Markdown Editor'}
    </button>
  )
}
