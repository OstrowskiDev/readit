import { useTextEditorContext } from '@/app/lib/context/TextEditorProvider'
import { parseHtmlToMarkdown } from '@/app/lib/text-editor/parseHtmlToMarkdown'
import { parseMarkdownToHtml } from '@/app/lib/text-editor/parseMarkdownToHtml'

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
