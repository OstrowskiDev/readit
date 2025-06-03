import { useTextEditorContext } from '@/lib/context/TextEditorProvider'
import { parseHtmlToMarkdown } from '@/lib/text-editor/parseHtmlToMarkdown'
import { parseMarkdownToHtml } from '@/lib/text-editor/parseMarkdownToHtml'

export function ToggleEditorTypeBtn() {
  const { formData, setFormData } = useTextEditorContext()

  function handleToggleEditor() {
    if (formData.toggleEditor === 'formated_text_editor') {
      const newMarkdownString = parseHtmlToMarkdown(formData.content)
      setFormData({
        ...formData,
        toggleEditor: 'markdown_editor',
        markdown: newMarkdownString,
      })
    } else if (formData.toggleEditor === 'markdown_editor') {
      const newHtmlString = parseMarkdownToHtml(formData.markdown)
      setFormData({
        ...formData,
        toggleEditor: 'formated_text_editor',
        content: newHtmlString,
      })
    } else {
      console.error('Invalid toggleEditor value:', formData.toggleEditor)
    }
  }

  const isMarkdown = formData.toggleEditor === 'markdown_editor'

  return (
    <button
      className={`toggle-editor-btn ${
        isMarkdown ? 'min-w-[240px]' : ' min-w-[210px]'
      } h-[32px] px-[6px] ml-auto app-text-blue text-sm hover:text-app-strongorange-500 rounded-full`}
      type="button"
      onClick={handleToggleEditor}
    >
      {isMarkdown
        ? 'Change to Formatted Text Editor'
        : 'Change to Markdown Editor'}
    </button>
  )
}
