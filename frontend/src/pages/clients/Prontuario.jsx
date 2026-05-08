import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Prontuario.css";

const Prontuario = () => {
  const navigate = useNavigate();

  const [patients] = useState([
    {
      id: 1,
      name: "Beatriz Silva",
      age: 28,
      history: [
        "Limpeza de pele - 10/05/2026",
        "Botox - 20/05/2026"
      ],
      notes: "Paciente sensível a produtos fortes."
    },
    {
      id: 2,
      name: "Mariana Costa",
      age: 34,
      history: [
        "Peeling químico - 15/05/2026"
      ],
      notes: "Primeira sessão com bons resultados."
    }
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div className="prontuario-container">

      <div className="prontuario-header">
        <h1>Prontuário</h1>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>

      <div className="prontuario-content">

        {/* 📋 LISTA DE PACIENTES */}
        <div className="lista-pacientes">
          <h3>Pacientes</h3>

          {patients.map((p) => (
            <div
              key={p.id}
              className={`paciente-card ${selected?.id === p.id ? "active" : ""}`}
              onClick={() => setSelected(p)}
            >
              <strong>{p.name}</strong>
              <span>{p.age} anos</span>
            </div>
          ))}

        </div>

        {/* 📄 DETALHES */}
        <div className="detalhes">

          {!selected ? (
            <p>Selecione um paciente para visualizar o prontuário</p>
          ) : (
            <>
              <h2>{selected.name}</h2>
              <p><strong>Idade:</strong> {selected.age}</p>

              <h3>Histórico</h3>
              <ul>
                {selected.history.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3>Observações</h3>
              <p>{selected.notes}</p>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Prontuario;