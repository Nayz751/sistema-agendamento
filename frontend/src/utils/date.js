export function toDate(value) {
  return value instanceof Date
    ? value
    : new Date(value);
}

export function formatDate(value) {
  return toDate(value)
    .toLocaleDateString("pt-BR");
}

export function formatTime(value) {
  return toDate(value)
    .toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
}