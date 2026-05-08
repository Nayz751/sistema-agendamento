import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import HomeClients from "../pages/clients/HomeClients";
import NewClientForm from "../pages/clients/NewClientForm";
import Appointment from "../pages/Appointment";
import ClientProfile from "../pages/clients/PerfilCliente";
import Prontuario from "../pages/Prontuario";

export default function AppRoutes({
  clients,
  appointments,
  loadClients,
  loadAppointments,
  openClientProfile
}) {
  return (
    <Routes>

      <Route element={<Layout />}>

        {/* 🏠 HOME */}
        <Route
          path="/"
          element={
            <Dashboard
              appointments={appointments}
              clients={clients}
              openClientProfile={openClientProfile}
            />
          }
        />

        {/* 👥 LISTA DE CLIENTES */}
        <Route
          path="/clients"
          element={
            <HomeClients clients={clients} />
          }
        />

        {/* ➕ NOVO CLIENTE */}
        <Route
          path="/clients/new"
          element={<NewClientForm />}
        />

        {/* 📅 AGENDAMENTOS */}
        <Route
          path="/appointments"
          element={<Appointment />}
        />

        {/* 📄 PERFIL */}
        <Route
          path="/profile"
          element={<ClientProfile />}
        />

        {/* 🩺 PRONTUÁRIO */}
        <Route
          path="/prontuario"
          element={<Prontuario />}
        />
  
      </Route>

    </Routes>
  );
}