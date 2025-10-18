export default function SimpleCardInput({
  className,
  elementName,
  name,
  type,
  fieldValidity,
  submitAttempted,
  value,
  onChange,
  label,
  placeholder,
}) {
  const hasError = fieldValidity[name]?.message.length > 0 && submitAttempted
  const errorId = `${name}-error`

  return (
    <div className={`${elementName}-container mt-8 ${className}`}>
      <label className={`${elementName}-label block mb-1`} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${elementName}-input 
        w-full px-4 py-2 
        rounded-lg glass-blue-soft
        text-app-blue-text 
        resize-none 
        focus:outline-none 
        input-autofill-override
          ${hasError ? 'focus:border-red-500' : 'focus:border-app-blue'}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        required
      />
      {hasError && (
        <div
          id={errorId}
          className={`${elementName}-error text-xs text-red-200`}
          role="alert"
          aria-live="polite"
        >
          {fieldValidity[name]?.message}
        </div>
      )}
    </div>
  )
}
