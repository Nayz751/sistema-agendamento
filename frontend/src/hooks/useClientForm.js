import { useState } from "react";
import { createClient } from "../service/clientService";
import { validateCPF } from "../utils/validateCPF";

export function useClientForm(navigate) {
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

  function clear() {
    setName("");
    setPhone("");
    setEmail("");
    setCpf("");
    setNotes("");
    clearErrors();
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
      const res = await createClient({
        nome: name,
        telefone: phone,
        email,
        cpf,
        notas: notes,
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

  return {
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
  };
}