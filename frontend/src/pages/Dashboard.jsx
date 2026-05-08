import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuickActions from "../components/dashboard/QuickActions";
import AppointmentTable from "../components/dashboard/AppointmentTable";
import StatCard from "../components/dashboard/StatCard";
import { ROUTES } from "../routes/navigation";
import "./Dashboard.css";

const Dashboard = ({ clients }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  const appointments = [
    { id: 1, date: today, time: "09:00", client: "Beatriz Silva", service: "Limpeza de Pele", status: "Confirmado" },
    { id: 2, date: today, time: "10:30", client: "Mariana Costa", service: "Botox", status: "Pendente" },
    { id: 3, date: today, time: "13:00", client: "Camila Oliveira", service: "Peeling Químico", status: "Em andamento" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const todayDate = new Date();
  const startOfWeek = new Date(todayDate);
  startOfWeek.setDate(todayDate.getDate() - todayDate.getDay());

  const weekTotal = appointments.filter(
    (a) => new Date(a.date) >= startOfWeek && new Date(a.date) <= todayDate
  ).length;

  const serviceCount = {};
  appointments.forEach((a) => {
    serviceCount[a.service] = (serviceCount[a.service] || 0) + 1;
  });

  let topService = "-";
  let topValue = 0;

  Object.entries(serviceCount).forEach(([service, count]) => {
    if (count > topValue) {
      topService = service;
      topValue = count;
    }
  });

  const topPercentage = appointments.length
    ? Math.round((topValue / appointments.length) * 100)
    : 0;

  const filteredList = appointments.filter((item) => {
    const matchSearch =
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase());

    return showAll ? matchSearch : item.date === today && matchSearch;
  });

  const suggestions = appointments.filter(
    (item) =>
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="dashboard-header-white">
        <div className="header-content">

          <div className="header-titles">
            <h1>Olá, Nayara 👋</h1>
            <p>Visão geral do sistema</p>
          </div>

          <div className="header-search-area">
            <div ref={searchRef} style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Buscar cliente ou serviço..."
                className="search-input-gray"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />

              {showSuggestions && search && (
                <div className="search-dropdown">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <div
                        key={item.id}
                        className="search-item"
                        onClick={() => {
                          setSearch(item.client);
                          setShowSuggestions(false);
                        }}
                      >
                        <strong>{item.client}</strong>
                        <span>{item.service}</span>
                      </div>
                    ))
                  ) : (
                    <div className="search-item">Nenhum resultado</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* STATS */}
        <div className="stats-grid">

          <StatCard label="Hoje" value={appointments.filter(a => a.date === today).length} sub="Agendamentos" />
          <StatCard label="Clientes" value={clients?.length || 0} sub="Ativos" />
          <StatCard label="Faturamento" value="R$ 2.450" sub="Total" />
          <StatCard label="Semana" value={weekTotal} sub="Previsão" />
          <StatCard label="Serviço em Alta" value={topService} sub={`${topPercentage}% de demanda`} />

        </div>

        {/* GRID */}
        <div className="dashboard-grid">

          <section className="appointments-section">

            <div className="section-header">
              <h2>Agenda de Hoje</h2>

              <button
                className="btn-view-all"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Ver hoje" : "Ver todos"}
              </button>
            </div>

            {/* TABLE COMPONENT */}
            <AppointmentTable
              filteredList={filteredList}
              clients={clients}
              navigate={navigate}
              ROUTES={ROUTES}
              getInitials={getInitials}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              menuRef={menuRef}
            />

          </section>

          {/* SIDEBAR */}
          <aside className="sidebar-right">

            <QuickActions />

            <div className="finance-box">
              <h3>Resumo Financeiro</h3>

              <div><span>Hoje</span><strong>R$ 1.850,00</strong></div>
              <div><span>Semana</span><strong>R$ 8.420,00</strong></div>
              <div><span>Total Mensal</span><strong>R$ 24.312,00</strong></div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;