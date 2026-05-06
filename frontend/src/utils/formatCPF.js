export function formatCPF(value) {
  let numbers = value.replace(/\D/g, "").substring(0, 11);

  numbers = numbers.replace(/(\d{3})(\d)/, "$1.$2");
  numbers = numbers.replace(/(\d{3})(\d)/, "$1.$2");
  numbers = numbers.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return numbers;
}