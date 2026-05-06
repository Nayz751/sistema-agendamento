import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeClients.css";

const HomeClients = ({ clients, loadClients }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // 🔥 ordenação A-Z (sem mutar o original)
  const sortedClients = [...clients].sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
  );

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deseja excluir este cliente?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
      });

      await loadClients();

      if (selected?.id === id) {
        setSelected(null);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="homeclients-container">

      {/* HEADER */}
      <div className="homeclients-header">
        <div>
          <h1>Clientes</h1>
          <p>Gestão e cadastro de clientes</p>
        </div>

        <button
          className="btn-new-client"
          onClick={() => navigate("/clients/new")}
        >
          + Novo Cliente
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className="homeclients-grid">

        {/* TABELA */}
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>Último atend.</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {sortedClients.map((c) => (
                <tr key={c.id} onClick={() => setSelected(c)}>

                  <td>
                    <div className="client-cell">
                      <div className="avatar">
                        {c.nome?.[0]}
                      </div>

                      <div>
                        <strong>{c.nome}</strong>
                        <span>{c.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="status ativo">ATIVO</span>
                  </td>

                  <td>-</td>
                  <td>-</td>

                  <td>
                    <div className="actions">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/profile", { state: c });
                        }}
                      >
                        👁
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/clients/edit/${c.id}`);
                        }}
                      >
                        ✏️
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(c.id);
                        }}
                      >
                        🗑
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SIDEBAR */}
        <div className="detail-box">

          {!selected ? (
            <p>Selecione um cliente</p>
          ) : (
            <>
              <div className="detail-header">
                <div className="avatar big">
                  {selected.nome?.[0]}
                </div>

                <h2>{selected.nome}</h2>
                <span>Cliente ativo</span>
              </div>

              <div className="detail-info">
                <p><strong>Telefone:</strong> {selected.telefone || "-"}</p>
                <p><strong>Email:</strong> {selected.email || "-"}</p>
              </div>

              <div className="detail-actions">
                <button
                  onClick={() =>
                    navigate("/profile", { state: selected })
                  }
                >
                  Ver Perfil
                </button>

                <button
                  onClick={() =>
                    navigate("/appointments", {
                      state: { client: selected }
                    })
                  }
                >
                  Agendar
                </button>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default HomeClients;