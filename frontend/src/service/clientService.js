export async function createClient(data) {
  return fetch("http://localhost:3000/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteClient(id) {
  return await fetch(`http://localhost:3000/clientes/${id}`, {
    method: "DELETE",
  });
}

export async function updateClient(id, data) {
  return fetch(`http://localhost:3000/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
