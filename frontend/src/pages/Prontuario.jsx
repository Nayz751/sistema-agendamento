import React, { useState } from "react";
import "./Prontuario.css";

const MedicalRecord = ({ back }) => {

  const [patients] = useState([
    {
      id: 1,
      name: "Beatriz Silva",
      age: 28,
      history: [
        "Facial cleansing - 10/05/2026",
        "Botox - 20/05/2026"
      ],
      notes: "Patient sensitive to strong products."
    },
    {
      id: 2,
      name: "Mariana Costa",
      age: 34,
      history: [
        "Chemical peeling - 15/05/2026"
      ],
      notes: "First session with good results."
    }
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div className="prontuario-container">

      <div className="prontuario-header">
        <h1>Medical Record</h1>
        <button onClick={back}>Back</button>
      </div>

      <div className="prontuario-content">
        <div className="lista-pacientes">
          <h3>Patients</h3>

          {patients.map((p) => (
            <div
              key={p.id}
              className={`paciente-card ${selected?.id === p.id ? "active" : ""}`}
              onClick={() => setSelected(p)}
            >
              <strong>{p.name}</strong>
              <span>{p.age} years</span>
            </div>
          ))}

        </div>

        <div className="detalhes">

          {!selected ? (
            <p>Select a patient to view the medical record</p>
          ) : (
            <>
              <h2>{selected.name}</h2>
              <p><strong>Age:</strong> {selected.age}</p>

              <h3>History</h3>
              <ul>
                {selected.history.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3>Notes</h3>
              <p>{selected.notes}</p>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default MedicalRecord;