export function formatPhone(value) {
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