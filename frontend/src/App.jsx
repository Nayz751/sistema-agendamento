import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // 🔹 Buscar clientes
  const loadClients = async () => {
    try {
      const res = await fetch("http://localhost:3000/clientes");

      if (!res.ok) {
        throw new Error("Erro ao buscar clientes");
      }

      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Buscar agendamentos
  const loadAppointments = async () => {
    try {
      const res = await fetch("http://localhost:3000/agenda-detalhada");

      if (!res.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }

      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Carregar dados ao iniciar
  useEffect(() => {
    loadClients();
    loadAppointments();
  }, []);

  // 🔹 Abrir perfil (placeholder)
  const openClientProfile = (client) => {
    console.log(client);
  };

  return (
    <BrowserRouter>
      <AppRoutes
        clients={clients}
        appointments={appointments}
        loadClients={loadClients}
        loadAppointments={loadAppointments}
        openClientProfile={openClientProfile}
      />
    </BrowserRouter>
  );
}

export default App;