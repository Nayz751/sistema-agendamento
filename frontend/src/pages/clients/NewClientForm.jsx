import { useNavigate } from "react-router-dom";
import { removeEmoji } from "../../utils/removeEmoji";
import { formatPhone } from "../../utils/formatPhone";
import { formatCPF } from "../../utils/formatCPF";
import FormField from "../../components/ui/FormField";
import { useClientForm } from "../../hooks/useClientForm";
import Toast from "../../components/ui/Toast";
import { useToast } from "../../hooks/useToast";
import "./NewClientForm.css";

function NewClientForm() {
  const navigate = useNavigate();

  const { toast, showToast, closeToast } = useToast();

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
  } = useClientForm(navigate, showToast);

  return (
    <div className="aura-container">
      <main className="aura-main">

        <header className="aura-header">
          <div className="header-title">
            <button
              className="back-arrow"
              onClick={() => navigate(-1)}
            >
              ←
            </button>

            <h1>Cadastro de Cliente</h1>
          </div>

          <div className="header-actions">
            <button className="btn-text" onClick={clear}>
              Cancelar
            </button>

            <button className="btn-primary" onClick={saveClient}>
              Salvar Cliente
            </button>
          </div>
        </header>

        <div className="aura-content-grid">

          <div>

            <div className="aura-card aura-upload-card">
              <div className="photo-placeholder">
                <div className="camera-badge">📷</div>
              </div>

              <h3>Foto do Cliente</h3>
              <p>Identificação opcional</p>
            </div>

            <div className="aura-info-box">
              <h4>💡 Dica</h4>
              <p>Cadastre os clientes corretamente para facilitar os agendamentos futuros.</p>
            </div>

          </div>

          {/* LADO DIREITO */}
          <div>

            <div className="aura-card">

              <h2>Dados do Cliente</h2>

              <FormField label="Nome *" error={nameError}>
                <input
                  value={name}
                  onChange={(e) => setName(removeEmoji(e.target.value))}
                />
              </FormField>

              <FormField label="Telefone *" error={phoneError}>
                <input
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
              </FormField>

              <FormField label="Email *" error={emailError}>
                <input
                  value={email}
                  onChange={(e) => setEmail(removeEmoji(e.target.value))}
                />
              </FormField>

              <FormField label="CPF">
                <input
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                />
              </FormField>

              <FormField label="Observações">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(removeEmoji(e.target.value))}
                />
              </FormField>

            </div>

          </div>

        </div>

        <Toast
          open={toast.open}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />

      </main>
    </div>
  );
}

export default NewClientForm;