export function sortClients(clients) {
  return [...clients].sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR", {
      sensitivity: "base",
    })
  );
}