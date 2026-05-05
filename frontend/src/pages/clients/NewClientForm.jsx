import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewClientForm.css";

function NewClientForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [notes, setNotes] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");

  function clearErrors() {
    setNameError("");
    setPhoneError("");
    setEmailError("");
    setCpfError("");
  }

  function removeEmoji(text) {
    return text.replace(
      /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
      ""
    );
  }

  function formatPhone(value) {
    let numbers = value.replace(/\D/g, "").substring(0, 11);

    if (numbers.length <= 2) return `(${numbers}`;

    if (numbers.length <= 7) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
    }

    return `(${numbers.substring(0, 2)}) ${numbers.substring(
      2,
      7
    )}-${numbers.substring(7, 11)}`;
  }

  function formatCPF(value) {
    let numbers = value.replace(/\D/g, "").substring(0, 11);

    numbers = numbers.replace(/(\d{3})(\d)/, "$1.$2");
    numbers = numbers.replace(/(\d{3})(\d)/, "$1.$2");
    numbers = numbers.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return numbers;
  }

  function validateCPF(cpfValue) {
    const clean = cpfValue.replace(/\D/g, "");

    if (clean.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(clean)) return false;

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;

    if (rest !== parseInt(clean.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;

    if (rest !== parseInt(clean.substring(10, 11))) {
      return false;
    }

    return true;
  }

  function validateFields() {
    clearErrors();
    let valid = true;

    const nameRegex = /^[A-Za-zÀ-ÿĀ-ž\s'-]+$/;
    const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!name.trim()) {
      setNameError("Informe o nome.");
      valid = false;
    } else if (!nameRegex.test(name)) {
      setNameError("Nome inválido.");
      valid = false;
    }

    if (!phone.trim()) {
      setPhoneError("Informe o telefone.");
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Use o formato: (11) 91234-5678");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Informe o email.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email inválido.");
      valid = false;
    }

    if (cpf.trim() !== "") {
      if (!cpfRegex.test(cpf)) {
        setCpfError("Formato: 000.000.000-00");
        valid = false;
      } else if (!validateCPF(cpf)) {
        setCpfError("CPF inválido.");
        valid = false;
      }
    }

    return valid;
  }

  async function saveClient() {
    if (!validateFields()) return;

    try {
      const res = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          telefone: phone,
          email: email,
          cpf: cpf,
          notas: notes,
        }),
      });

      if (res.ok) {
        alert("Cliente cadastrado com sucesso!");
        clear();
        navigate("/");
      } else {
        alert("Erro ao cadastrar cliente.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro no servidor.");
    }
  }

  function clear() {
    setName("");
    setPhone("");
    setEmail("");
    setCpf("");
    setNotes("");
    clearErrors();
  }

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
              <p>
                Cadastre os clientes corretamente para facilitar os agendamentos futuros.
              </p>
            </div>
          </div>

          <div>
            <div className="aura-card">

              <h2 className="section-header">
                Dados do Cliente
              </h2>

              <div className="form-row">
                <div className="input-group full">
                  <label>Nome *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(removeEmoji(e.target.value))
                    }
                    placeholder="Nome completo"
                  />
                  {nameError && <span className="erro-texto">{nameError}</span>}
                </div>
              </div>

              <div className="form-row">

                <div className="input-group">
                  <label>Telefone *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(formatPhone(e.target.value))
                    }
                    placeholder="(11) 91234-5678"
                  />
                  {phoneError && <span className="erro-texto">{phoneError}</span>}
                </div>

                <div className="input-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(removeEmoji(e.target.value))
                    }
                    placeholder="email@email.com"
                  />
                  {emailError && <span className="erro-texto">{emailError}</span>}
                </div>

              </div>

              <div className="form-row">
                <div className="input-group full">
                  <label>CPF (Opcional)</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) =>
                      setCpf(formatCPF(e.target.value))
                    }
                    placeholder="000.000.000-00"
                  />
                  {cpfError && <span className="erro-texto">{cpfError}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group full">
                  <label>Observações</label>
                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(removeEmoji(e.target.value))
                    }
                    placeholder="Observações importantes..."
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default NewClientForm;