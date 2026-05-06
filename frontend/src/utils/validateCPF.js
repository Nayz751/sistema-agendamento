export function validateCPF(cpfValue) {
  const clean = cpfValue.replace(/\D/g, "");

  if (clean.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10) rest = 0;

  if (rest !== parseInt(clean.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10) rest = 0;

  if (rest !== parseInt(clean.substring(10, 11))) {
    return false;
  }

  return true;
}