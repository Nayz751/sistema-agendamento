function AppointmentHeader({
  navigate,
  resetForm,
  saveAppointment,
}) {
  return (
    <header className="aura-header">

      <div className="header-title">

        <button
          className="back-arrow"
          onClick={() => navigate("/")}
        >
          ←
        </button>

        <h1>
          Novo Agendamento
        </h1>

      </div>

      <div className="header-actions">

        <button
          className="btn-text"
          onClick={resetForm}
        >
          Limpar
        </button>

        <button
          className="btn-primary"
          onClick={saveAppointment}
        >
          Agendar
        </button>

      </div>

    </header>
  );
}

export default AppointmentHeader;