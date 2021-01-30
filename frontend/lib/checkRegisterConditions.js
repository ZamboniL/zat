export default function checkRegisterConditions(email, username, password) {
  if (!/\S+@\S+\.\S+/.test(email)) return "Email invalido";
  if (username.length < 3) return "Username precisa ser de no minimo 3 caracteres";
  if (password.length < 6) return "Senha precisa ser de no minimo 6 caracteres";
  return false;
}
