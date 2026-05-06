import { useNavigate } from "react-router-dom";
import { removeEmoji } from "../../utils/removeEmoji";
import { formatPhone } from "../../utils/formatPhone";
import { formatCPF } from "../../utils/formatCPF";
import FormField from "../../components/ui/FormField";
import { useClientForm } from "../../hooks/useClientForm";
import "./NewClientForm.css";

function NewClientForm() {
  const navigate = useNavigate();

  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    cpf,
    setCpf,
    notes,
    setNotes,

    nameError,
    phoneError,
    emailError,
    cpfError,

    saveClient,
    clear,
  } = useClientForm(navigate);

  return (
    <div className="aura-container">
      <main className="aura-main">

        <header className="aura-header">
          <div className="header-title">
            <button
              className="back-arrow"
              onClick={() => navigate("/")}
            >
              ←
            </button>

            <h1>Cadastro de Cliente</h1>
          </div>

          <div className="header-actions">
            <button
              className="btn-text"
              onClick={clear}
            >
              Cancelar
            </button>

            <button
              className="btn-primary"
              onClick={saveClient}
            >
              Salvar Cliente
            </button>
          </div>
        </header>

        <div className="aura-content-grid">

          {/* LADO ESQUERDO */}
          <div>

            <div className="aura-card aura-upload-card">
              <div className="photo-placeholder">
                <div className="camera-badge">📷</div>
              </div>

              <h3>Foto do Cliente</h3>

              <p>
                Identificação opcional
              </p>
            </div>

            <div className="aura-info-box">
              <h4>💡 Dica</h4>

              <p>
                Cadastre os clientes corretamente para facilitar os
                agendamentos futuros.
              </p>
            </div>

          </div>

          {/* LADO DIREITO */}
          <div>

            <div className="aura-card">

              <h2 className="section-header">
                Dados do Cliente
              </h2>

              {/* NOME */}
              <div className="form-row">
                <FormField
                  label="Nome *"
                  error={nameError}
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(removeEmoji(e.target.value))
                    }
                    placeholder="Nome completo"
                  />
                </FormField>
              </div>

              {/* TELEFONE + EMAIL */}
              <div className="form-row">

                <FormField
                  label="Telefone *"
                  error={phoneError}
                >
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(formatPhone(e.target.value))
                    }
                    placeholder="(11) 91234-5678"
                  />
                </FormField>

                <FormField
                  label="Email *"
                  error={emailError}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(removeEmoji(e.target.value))
                    }
                    placeholder="email@email.com"
                  />
                </FormField>

              </div>

              {/* CPF */}
              <div className="form-row">
                <FormField
                  label="CPF (Opcional)"
                  error={cpfError}
                >
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) =>
                      setCpf(formatCPF(e.target.value))
                    }
                    placeholder="000.000.000-00"
                  />
                </FormField>
              </div>

              {/* OBSERVAÇÕES */}
              <div className="form-row">
                <FormField label="Observações">
                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(removeEmoji(e.target.value))
                    }
                    placeholder="Observações importantes..."
                  />
                </FormField>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default NewClientForm;