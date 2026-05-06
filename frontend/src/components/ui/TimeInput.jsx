function TimeInput({
  value,
  onChange,
  label = "Horário",
}) {
  return (
    <div className="input-group">

      <label>
        {label}
      </label>

      <input
        type="time"
        value={value}
        onChange={onChange}
      />

    </div>
  );
}

export default TimeInput;