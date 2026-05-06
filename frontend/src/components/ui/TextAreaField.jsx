function TextAreaField({
  value,
  onChange,
  label = "Observações",
  placeholder = "",
}) {
  return (
    <div className="input-group">

      <label>
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

    </div>
  );
}

export default TextAreaField;