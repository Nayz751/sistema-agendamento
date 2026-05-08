import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="aura-sidebar">
      
      <div className="aura-logo">
        Aura Aesthetic
      </div>

      <nav className="aura-nav">

        <button className="aura-nav-item" onClick={() => navigate("/")}>
          🏠 Home
        </button>

        <button className="aura-nav-item" onClick={() => navigate("/clients")}>
          📄 Clientes
        </button>

        <button className="aura-nav-item" onClick={() => navigate("/Appointment")}>
          📅 Agendamento
        </button>

        <button className="aura-nav-item" onClick={() => navigate("/profile")}>
          👤 Perfil
        </button>

      </nav>

      <div className="aura-user-pill">
        <div className="user-initials">ND</div>
        <div className="user-meta">
          <span className="user-name">Nayara Diniz</span>
          <span className="user-role">Clinic Manager</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;