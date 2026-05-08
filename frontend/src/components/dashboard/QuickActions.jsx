import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="shortcut-box">
      <h3>Ações Rápidas</h3>

      <div className="shortcut-grid">

        <button
          className="shortcut-item"
          onClick={() => navigate("/appointment")}
        >
          Novo agendamento
        </button>

        <button
          className="shortcut-item"
          onClick={() => navigate("/clients/new")}
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
  );
}