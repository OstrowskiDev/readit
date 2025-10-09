import { TextEditorIco } from '../icons/TextEditorIco'

export function ToggleTextEditorBtn({ handleEditorToggle, toggleTextEditor }) {
  const currentMode = toggleTextEditor
    ? 'plain text editor'
    : 'advanced text editors'
  const nextMode = toggleTextEditor
    ? 'advanced text editors'
    : 'plain text editor'

  return (
    <div className="wrapper-orange-btn-bg ml-2 leading-none">
      <button
        className="post-reply-text-editor-btn button-orange-strong w-8 h-9 p-1"
        type="button"
        aria-label={`Switch from ${currentMode} to ${nextMode}`}
        onClick={handleEditorToggle}
      >
        <TextEditorIco color={'white'} />
      </button>
    </div>
  )
}
