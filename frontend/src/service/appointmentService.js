export async function getClients() {
  const res = await fetch("http://localhost:3000/clientes");
  return await res.json();
}

export async function getNextAppointment() {
  const res = await fetch("http://localhost:3000/agenda-detalhada");
  const data = await res.json();

  const pending = data
    .filter(
      (item) =>
        item.status &&
        item.status.toLowerCase() === "pendente"
    )
    .sort(
      (a, b) =>
        new Date(a.data_agendamento) -
        new Date(b.data_agendamento)
    );

  return pending[0] || null;
}

export async function createAppointment(payload) {
  return await fetch("http://localhost:3000/agenda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function confirmAppointment(item) {
  return await fetch(
    `http://localhost:3000/agenda/${item.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cliente_id: item.cliente_id,
        data_agendamento: item.data_agendamento,
        servico: item.servico,
        status: "confirmado",
      }),
    }
  );
}