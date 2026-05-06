import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const loadClients = async () => {
    try {
      const res = await fetch("http://localhost:3000/clientes");
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const loadAppointments = async () => {
    try {
      const res = await fetch("http://localhost:3000/agenda-detalhada");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  useEffect(() => {
    loadClients();
    loadAppointments();
  }, []);

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