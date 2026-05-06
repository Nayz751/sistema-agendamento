function ServiceSelector({
  service,
  setService,
  serviceList,
}) {
  return (
    <div className="input-group">

      <label>
        Serviço
      </label>

      <div className="tag-container">

        {serviceList.map((s) => (
          <button
            key={s}
            type="button"
            className={`tag-button ${
              service === s
                ? "active"
                : ""
            }`}
            onClick={() =>
              setService(s)
            }
          >
            {s}
          </button>
        ))}

      </div>

    </div>
  );
}

export default ServiceSelector;