import { useState } from "react";


import { createClient } from "../service/clientService";
export function useClientForm(navigate, showToast) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [notes, setNotes] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");


  function validateFields() {
    let valid = true;

    if (!name) {
      setNameError("Nome obrigatório");
      valid = false;
    }

    if (!phone) {
      setPhoneError("Telefone obrigatório");
      valid = false;
    }

    if (!email) {
      setEmailError("Email obrigatório");
      valid = false;
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
      showToast("Cliente cadastrado com sucesso!", "success");
      clear();
    } else {
        showToast("Não foi possível criar o cliente. Tente novamente.", "error");
      }
    } catch (err) {
      console.log(err);
      showToast("Erro no servidor. Verifique sua conexão ou tente mais tarde.",
      "error");
    }
  }

  function clear() {
    setName("");
    setPhone("");
    setEmail("");
    setCpf("");
    setNotes("");
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