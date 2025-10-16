export default function PostFormTitle({
  fieldValidity,
  formData,
  setFormData,
}) {
  function onTitleChange(event) {
    setFormData({ ...formData, title: event.target.value })
  }

  return (
    <>
      <h3 className="post-edit-form-label ml-2 mt-4 text-md">title:</h3>
      <input
        className={`post-title-input bg-gray-950/20 text-app-blue-text w-full h-8 resize-none border-none focus:outline-none ring-1 py-1 px-2 rounded-md overflow-hidden ${
          fieldValidity.title.message.length > 0
            ? 'ring-red-400 focus:ring-red-500'
            : 'ring-app-blue/50 focus:ring-app-blue'
        }`}
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={onTitleChange}
      />
      <div className="post-title-feedback flex flex-row justify-between">
        <label className="post-title-error text-xs text-red-500">
          {fieldValidity.title.message.length > 0 &&
            fieldValidity.title.message.join(' ')}
        </label>
        <div
          className={`post-title-charcount px-2 text-xs ${
            formData.title.length <= 60
              ? 'text-app-blue-text/70'
              : 'text-red-500'
          }`}
        >
          {formData.title.length}/60
        </div>
      </div>
    </>
  )
}
