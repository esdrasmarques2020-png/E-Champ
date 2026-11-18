const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const role = formLogin.dataset.role;
  const credencialEsperada = role === "admin" ? "admin" : "jogador";
  mensagemLogin.className = "mensagem";
  if (!usuario || !senha) { mensagemLogin.textContent = "Preencha usuário/e-mail e senha para continuar."; mensagemLogin.classList.add("erro"); return; }
  if (usuario === credencialEsperada && senha === "123") {
    mensagemLogin.textContent = "Acesso demonstrativo realizado com sucesso!"; mensagemLogin.classList.add("sucesso");
    sessionStorage.setItem("echampUsuario", usuario); sessionStorage.setItem("echampPerfil", role);
    setTimeout(() => { window.location.href = role === "admin" ? "area-restrita.html" : "campeonatos.html"; }, 500);
  } else { mensagemLogin.textContent = "Dados incorretos para este tipo de acesso. Confira e tente novamente."; mensagemLogin.classList.add("erro"); }
});
