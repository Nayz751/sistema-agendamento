function FormField({ label, error, children }) {
  return (
    <div className="input-group">
      <label>{label}</label>

      {children}

      {error && <span className="erro-texto">{error}</span>}
    </div>
  );
}

export default FormField;