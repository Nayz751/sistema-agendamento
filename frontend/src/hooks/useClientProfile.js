import { useState } from "react";

import {
  updateClient,
  deleteClient,
} from "../service/clientService";

export function useClientProfile(
  client,
  navigate
) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [form, setForm] = useState({
    nome: client?.nome || "",
    telefone: client?.telefone || "",
    email: client?.email || "",
    notas: client?.notas || "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  }

  async function handleSave() {
    try {

      await updateClient(
        client.id,
        form
      );

      setIsEditing(false);

    } catch (err) {

      console.error(err);
    }
  }

  async function handleDelete() {

    console.log("clicou");

    try {

      await deleteClient(client.id);

      console.log(
        "cliente excluído"
      );

      navigate("/");

    } catch (err) {

      console.error(
        "erro ao excluir cliente:",
        err
      );
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