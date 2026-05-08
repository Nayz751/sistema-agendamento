import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./appointment.css";

import ClientAutocomplete from "../../components/ui/ClientAutocomplete";
import TimeInput from "../../components/ui/TimeInput";
import TextAreaField from "../../components/ui/TextAreaField";
import ServiceSelector from "../../components/Appointment/ServiceSelector";
import NextAppointmentCard from "../../components/Appointment/NextAppointmentCard";
import AppointmentHeader from "../../components/Appointment/AppointmentHeader";
import AppointmentSidebar from "../../components/Appointment/AppointmentSidebar";
import { useAppointmentForm } from "../../hooks/useAppointmentForm";

function Appointment() {
  const navigate = useNavigate();

  const {
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

    notes,
    setNotes,

    serviceList,
    filteredClients,

    saveAppointment,
    resetForm,
    handleConfirmAppointment,
  } = useAppointmentForm();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="aura-container">

      <main className="aura-main">

        {/* HEADER */}
        <AppointmentHeader
          navigate={navigate}
          resetForm={resetForm}
          saveAppointment={saveAppointment}
        />

        <div className="aura-content-grid">

          {/* SIDEBAR ESQUERDA */}
          <aside>

            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              locale="pt-BR"
              minDate={today}
              tileDisabled={({ date }) => date < today}
            />

            <NextAppointmentCard
              nextAppointment={nextAppointment}
              handleConfirmAppointment={handleConfirmAppointment}
            />

            {/* 👉 AQUI ENTRA O NOVO SIDEBAR */}
            <AppointmentSidebar
              selectedClient={selectedClient}
              service={service}
              selectedDate={selectedDate}
              appointmentTime={appointmentTime}
              notes={notes}
            />

          </aside>

          {/* FORM PRINCIPAL */}
          <section className="aura-card">

            <h2>Cliente</h2>

            <ClientAutocomplete
              clientSearch={clientSearch}
              setClientSearch={setClientSearch}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              filteredClients={filteredClients}
            />

            <ServiceSelector
              serviceList={serviceList}
              service={service}
              setService={setService}
            />

            <TimeInput
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />

            <TextAreaField
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações importantes..."
            />

          </section>

        </div>

      </main>

    </div>
  );
}

export default Appointment;