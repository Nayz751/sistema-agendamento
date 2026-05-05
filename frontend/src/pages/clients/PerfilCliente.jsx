import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PerfilCliente.css";

const ClientProfile = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const client = location.state;

  if (!client) {
    return (
      <div className="perfil-container">
        <h2>Cliente não encontrado</h2>
        <button onClick={() => navigate("/")}>
          Voltar para início
        </button>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h1>Perfil do Cliente</h1>
      </header>

      <div className="actions-bar">
        <div className="tags">
          <span className="tag vip">VIP GOLD</span>
          <span className="tag ativo">ATIVO</span>
        </div>

        <div className="actions-buttons">
          <button>Editar Cliente</button>
          <button>Registrar Nota</button>
          <button className="primary">+ Novo Serviço</button>
        </div>
      </div>

      <div className="perfil-grid">
        <div className="card perfil-card">

          <div className="perfil-topo">
            <div className="foto"></div>

            <div>
              <h2>{client.nome}</h2>
              <span>ID: #{client.id}</span>
            </div>
          </div>

          <div className="info-grid">
            <div>
              <label>TELEFONE</label>
              <p>{client.telefone || "-"}</p>
            </div>

            <div>
              <label>EMAIL</label>
              <p>{client.email || "-"}</p>
            </div>

            <div>
              <label>CPF</label>
              <p>{client.cpf || "-"}</p>
            </div>

            <div>
              <label>OBSERVAÇÕES</label>
              <p>{client.notas || "-"}</p>
            </div>
          </div>

          <div className="alerta">
            <h4>⚠ OBSERVAÇÕES IMPORTANTES</h4>
            <p>{client.notas || "Nenhuma observação cadastrada."}</p>
          </div>
        </div>

        <div className="card financeiro-card">
          <h3>Resumo Financeiro</h3>

          <div className="finance-item">
            <span>Total gasto</span>
            <strong>R$ 4.280,00</strong>
          </div>

          <div className="finance-item danger">
            <span>Pendente</span>
            <strong>R$ 150,00</strong>
          </div>

          <div className="status">
            STATUS: OK
          </div>
        </div>
      </div>

      <div className="perfil-grid-bottom">
        <div className="card">
          <h3>Preferências</h3>

          <p><strong>Serviços favoritos:</strong></p>
          <div className="chips">
            <span>Limpeza de Pele</span>
            <span>Botox</span>
            <span>Drenagem Linfática</span>
          </div>

          <p><strong>Horários preferidos:</strong></p>
          <p>Terças e quintas após 17h</p>
        </div>

        <div className="card">
          <h3>Histórico de Serviços</h3>

          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Limpeza de Pele</td>
                <td>12/05/2024</td>
                <td>R$ 350,00</td>
              </tr>

              <tr>
                <td>Drenagem Linfática</td>
                <td>05/05/2024</td>
                <td>R$ 220,00</td>
              </tr>

              <tr>
                <td>Botox</td>
                <td>20/04/2024</td>
                <td>R$ 1.800,00</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ClientProfile;