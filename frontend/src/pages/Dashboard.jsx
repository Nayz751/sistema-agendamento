import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({
  openClientProfile,
  clients,
}) => {

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

      <header className="dashboard-header-white">
        <div className="header-content">

          <div className="header-titles">
            <h1>Olá, Nayara 👋</h1>
            <p>Visão geral do sistema</p>
          </div>

          <div className="header-search-area">
            <div style={{ position: "relative" }} ref={searchRef}>
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

      <main className="dashboard-main">

        <div className="stats-grid">

          <div className="stat-card">
            <span className="stat-label">Hoje</span>
            <span className="stat-value">
              {appointments.filter((a) => a.date === today).length}
            </span>
            <p>Agendamentos</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Clientes</span>
            <span className="stat-value">{clients?.length || 0}</span>
            <p>Ativos</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Faturamento</span>
            <span className="stat-value">R$ 2.450</span>
            <p>Total</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Semana</span>
            <span className="stat-value">{weekTotal}</span>
            <p>Previsão</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Serviço em Alta</span>
            <span className="stat-value">{topService}</span>
            <small>{topPercentage}% de demanda</small>
          </div>

        </div>

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

            <div className="table-container">
              <table className="aura-table">
                <thead>
                  <tr>
                    <th>Data & Hora</th>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredList.map((app) => (
                    <tr key={app.id}>

                      <td>
                        <strong>{app.time}</strong>
                        <span>
                          {app.date.split("-").reverse().slice(0, 2).join("/")}
                        </span>
                      </td>

                      <td>
                        <div className="table-client">
                          <div className="client-avatar">
                            {getInitials(app.client)}
                          </div>

                          <span
                            style={{ cursor: "pointer", textDecoration: "underline" }}
                            onClick={() => {
                              const fullClient = clients.find(
                                (c) => c.nome === app.client
                              );

                              if (fullClient) {
                                navigate("/profile", { state: fullClient });
                              }
                            }}
                          >
                            {app.client}
                          </span>
                        </div>
                      </td>

                      <td>{app.service}</td>
                      <td>{app.status}</td>

                      <td style={{ position: "relative" }}>
                        <button
                          className="btn-options"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === app.id ? null : app.id);
                          }}
                        >
                          •••
                        </button>

                        {openMenuId === app.id && (
                          <div ref={menuRef} className="popup-menu">
                            <ul>
                              <li onClick={() => navigate("/profile", { state: app })}>
                                Perfil
                              </li>
                              <li>Ficha médica</li>
                              <li>Histórico</li>
                            </ul>
                          </div>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </section>

          <aside className="sidebar-right">

            <div className="shortcut-box">
              <h3>Ações Rápidas</h3>

              <div className="shortcut-grid">

                <button
                  className="shortcut-item"
                  onClick={() => navigate("/appointments")}
                >
                  Novo agendamento
                </button>

                <button
                  className="shortcut-item"
                  onClick={() => navigate("/clients")}
                >
                  Adicionar cliente
                </button>

                <button
                  className="shortcut-item"
                  onClick={() => navigate("/services")}
                >
                  Adicionar serviço
                </button>

                <button
                  className="shortcut-item"
                  onClick={() => navigate("/prontuario")}
                >
                  Prontuário
                </button>

              </div>
            </div>

            <div className="finance-box">
              <h3>Resumo Financeiro</h3>

              <div>
                <span>Hoje</span>
                <strong>R$ 1.850,00</strong>
              </div>

              <div>
                <span>Semana</span>
                <strong>R$ 8.420,00</strong>
              </div>

              <div>
                <span>Total Mensal</span>
                <strong>R$ 24.312,00</strong>
              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;