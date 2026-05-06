import { useEffect, useState } from "react";

import {
  getClients,
  getNextAppointment,
  createAppointment,
  confirmAppointment,
} from "../service/appointmentService";

export function useAppointmentForm() {
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
    loadClients();
    loadNextAppointment();
  }, []);

  async function loadClients() {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadNextAppointment() {
    try {
      const data = await getNextAppointment();
      setNextAppointment(data);
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

  async function handleConfirmAppointment(item) {
    try {
      const res = await confirmAppointment(item);

      if (res.ok) {
        alert("Agendamento confirmado!");
        loadNextAppointment();
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

    try {
      const res = await createAppointment(payload);

      if (res.ok) {
        alert("Agendamento criado!");

        resetForm();
        loadNextAppointment();
      } else {
        alert("Erro ao criar agendamento");
      }
    } catch (err) {
      console.error(err);
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

  return {
    clients,
    clientSearch,
    setClientSearch,

    selectedClient,
    setSelectedClient,

    nextAppointment,

    selectedDate,
    setSelectedDate,

    service,
    setService,

    appointmentTime,
    setAppointmentTime,

    duration,
    setDuration,

    notes,
    setNotes,

    serviceList,
    filteredClients,

    saveAppointment,
    resetForm,
    handleConfirmAppointment,
  };
}