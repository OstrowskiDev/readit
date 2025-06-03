import { TextEditorIco } from '../icons/TextEditorIco'

export function ToggleTextEditorBtn({ handleEditorToggle }) {
  return (
    <div className="wrapper-orange-btn-bg ml-2 mt-1">
      <button
        className="post-reply-text-editor-btn button-orange-strong w-8 h-9 p-1"
        type="button"
        onClick={handleEditorToggle}
      >
        <TextEditorIco color={'white'} />
      </button>
    </div>
  )
}
