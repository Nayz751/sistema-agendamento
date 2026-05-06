import { useState } from "react";
import {
  updateClient,
  deleteClient,
} from "../service/clientService";

export function useClientProfile(client, navigate) {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    nome: client?.nome || "",
    telefone: client?.telefone || "",
    email: client?.email || "",
    notas: client?.notas || "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      await updateClient(client.id, form);

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Deseja excluir este cliente?"
    );

    if (!confirmDelete) return;

    try {
      await deleteClient(client.id);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return {
    isEditing,
    setIsEditing,

    form,
    handleChange,

    handleSave,
    handleDelete,
  };
}