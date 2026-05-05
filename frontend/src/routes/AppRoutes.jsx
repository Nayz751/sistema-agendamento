import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import NewClientForm from "../pages/clients/NewClientForm";
import Appointment from "../pages/Appointment";
import ClientProfile from "../pages/clients/PerfilCliente";

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

        {/* 👤 CADASTRO DE CLIENTE */}
        <Route
          path="/clients"
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

      </Route>

    </Routes>
  );
}