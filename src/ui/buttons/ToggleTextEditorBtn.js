import { TextEditorIco } from '../icons/TextEditorIco'

export function ToggleTextEditorBtn({ handleEditorToggle }) {
  return (
    <button
      className="post-reply-text-editor-btn btn-blue w-8 h-8 p-1 ml-2 mt-1"
      type="button"
      onClick={handleEditorToggle}
    >
      <TextEditorIco color={'white'} />
    </button>
  )
}
