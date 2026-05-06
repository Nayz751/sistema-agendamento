export default function AppointmentSidebar({
  selectedClient,
  service,
  selectedDate,
  appointmentTime,
  notes,
}) {
  const formatDate = (date) => {
    if (!date) return "Não selecionada";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <aside className="appointment-sidebar">

      <h3>Resumo do agendamento</h3>

      <div className="sidebar-block">
        <p><strong>Cliente:</strong> {selectedClient?.name || "Não selecionado"}</p>
      </div>

      <div className="sidebar-block">
        <p><strong>Serviço:</strong> {service || "Não selecionado"}</p>
      </div>

      <div className="sidebar-block">
        <p><strong>Data:</strong> {formatDate(selectedDate)}</p>
        <p><strong>Hora:</strong> {appointmentTime || "Não definida"}</p>
      </div>

      <div className="sidebar-block">
        <p><strong>Observações:</strong></p>
        <p className="notes">
          {notes?.trim() ? notes : "Nenhuma"}
        </p>
      </div>

    </aside>
  );
}