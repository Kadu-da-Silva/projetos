export function validEmail(email: string): boolean {
  // Expressão regular para validar o formato do email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Verificar se o email corresponde ao formato esperado
  if (!regex.test(email)) {
    return false;
  }
  // O email é válido
  return true;
}

export function validPassword(pass: string): boolean {
  // Verificar se a senha tem mais de 6 caracteres
  if (pass.length < 6) {
    return false;
  }
  // Verificar se a senha contém pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(pass)) {
    return false;
  }
  // Verificar se a senha contém pelo menos um caractere especial
  if (!/[\W_]/.test(pass)) {
    return false;
  }
  // Verificar se a senha contém pelo menos um número
  if (!/\d/.test(pass)) {
    return false;
  }
  // Todos os critérios foram atendidos
  return true;
}