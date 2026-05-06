import { useState } from "react";

export default function AppointmentForm({ onSubmit }) {
  const [form, setForm] = useState({
    client: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.client || !form.service || !form.date || !form.time) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    onSubmit?.(form);

    setForm({
      client: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Agendar atendimento</h2>

      <input
        type="text"
        name="client"
        placeholder="Nome do cliente"
        value={form.client}
        onChange={handleChange}
      />

      <input
        type="text"
        name="service"
        placeholder="Serviço"
        value={form.service}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Observações"
        value={form.notes}
        onChange={handleChange}
      />

      <button type="submit">Salvar agendamento</button>
    </form>
  );
}