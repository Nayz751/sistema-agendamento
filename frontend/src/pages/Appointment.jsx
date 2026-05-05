import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./appointment.css";

function Appointment() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [service, setService] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("09:00");
  const [duration, setDuration] = useState("60");
  const [notes, setNotes] = useState("");

  const serviceList = [
    "Facial",
    "Botox",
    "Peeling",
    "Massagem",
    "Limpeza",
    "Microagulhamento",
  ];

  useEffect(() => {
    fetch("http://localhost:3000/clientes")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchNextAppointment();
  }, []);

  async function fetchNextAppointment() {
    try {
      const res = await fetch("http://localhost:3000/agenda-detalhada");
      const data = await res.json();

      const pending = data
        .filter(
          (item) =>
            item.status &&
            item.status.toLowerCase() === "pendente"
        )
        .sort(
          (a, b) =>
            new Date(a.data_agendamento) - new Date(b.data_agendamento)
        );

      setNextAppointment(pending[0] || null);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredClients = clientSearch
    ? clients.filter((c) =>
        (c.nome || "")
          .toLowerCase()
          .includes(clientSearch.toLowerCase())
      )
    : [];

  const toDate = (value) =>
    value instanceof Date ? value : new Date(value);

  const formatDate = (value) =>
    toDate(value).toLocaleDateString("pt-BR");

  const formatTime = (value) =>
    toDate(value).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  async function confirmAppointment(item) {
    try {
      const res = await fetch(
        `http://localhost:3000/agenda/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cliente_id: item.cliente_id,
            data_agendamento: item.data_agendamento,
            servico: item.servico,
            status: "confirmado",
          }),
        }
      );

      if (res.ok) {
        alert("Agendamento confirmado!");
        fetchNextAppointment();
      } else {
        alert("Erro ao confirmar.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function saveAppointment() {
    if (!selectedClient || !service) {
      alert("Selecione cliente e serviço!");
      return;
    }

    const payload = {
      cliente_id: selectedClient.id,
      data_agendamento: `${
        selectedDate.toISOString().split("T")[0]
      } ${appointmentTime}`,
      servico: service,
      status: "pendente",
      notas: notes,
    };

    const res = await fetch("http://localhost:3000/agenda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Agendamento criado!");
      resetForm();
      fetchNextAppointment();
    } else {
      alert("Erro ao criar agendamento");
    }
  }
  function resetForm() {
    setSelectedClient(null);
    setClientSearch("");
    setService("");
    setAppointmentTime("09:00");
    setDuration("60");
    setNotes("");
    setSelectedDate(new Date());
  }

  return (
    <div className="aura-container">
      <main className="aura-main">
        <header className="aura-header">
          <div className="header-title">
            <button
              className="back-arrow"
              onClick={() => navigate("/")}
            >
              ←
            </button>

            <h1>Novo Agendamento</h1>
          </div>

          <div className="header-actions">
            <button className="btn-text" onClick={resetForm}>
              Limpar
            </button>

            <button className="btn-primary" onClick={saveAppointment}>
              Agendar
            </button>
          </div>
        </header>

        <div className="aura-content-grid">
          <aside>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              locale="pt-BR"
              minDate={today}
              tileDisabled={({ date }) => date < today}
            />

            <div className="aura-info-box">
              <h4>Próximo Cliente</h4>

              {nextAppointment ? (
                <>
                  <p><strong>Cliente:</strong> {nextAppointment.nome}</p>
                  <p><strong>Serviço:</strong> {nextAppointment.servico}</p>
                  <p><strong>Data:</strong> {formatDate(nextAppointment.data_agendamento)}</p>
                  <p><strong>Hora:</strong> {formatTime(nextAppointment.data_agendamento)}</p>

                  <button
                    className="btn-primary"
                    onClick={() => confirmAppointment(nextAppointment)}
                  >
                    Confirmar
                  </button>
                </>
              ) : (
                <p>Nenhum agendamento pendente.</p>
              )}
            </div>
          </aside>

          <section className="aura-card">
            <h2>Cliente</h2>
            <div className="input-group">
              <label>Cliente</label>

              <input
                value={
                  selectedClient
                    ? selectedClient.nome
                    : clientSearch
                }
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  setSelectedClient(null);
                }}
                placeholder="Buscar cliente..."
              />

              {clientSearch &&
                filteredClients.map((c) => (
                  <div
                    key={c.id}
                    className="autocomplete-item"
                    onClick={() => {
                      setSelectedClient(c);
                      setClientSearch("");
                    }}
                  >
                    {c.nome}
                  </div>
                ))}
            </div>
            <div className="input-group">
              <label>Serviço</label>

              <div className="tag-container">
                {serviceList.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`tag-button ${service === s ? "active" : ""}`}
                    onClick={() => setService(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Horário</label>

              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Observações</label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observações importantes..."
              />
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

export default Appointment;