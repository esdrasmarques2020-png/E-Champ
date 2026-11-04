const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const esqueciSenha = document.getElementById("esqueciSenha");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    mensagemLogin.className = "mensagem";

    if (!usuario && !senha) {
        mensagemLogin.textContent = "Informe seu usuário ou e-mail e sua senha para continuar.";
        mensagemLogin.classList.add("erro");
        document.getElementById("usuario").focus();
        return;
    }

    if (!usuario) {
        mensagemLogin.textContent = "O campo usuário ou e-mail está vazio. Preencha-o para continuar.";
        mensagemLogin.classList.add("erro");
        document.getElementById("usuario").focus();
        return;
    }

    if (!senha) {
        mensagemLogin.textContent = "O campo senha está vazio. Digite sua senha para continuar.";
        mensagemLogin.classList.add("erro");
        document.getElementById("senha").focus();
        return;
    }

    // Credencial de demonstração exigida pela atividade.
    if (usuario === "teste" && senha === "123") {
        mensagemLogin.textContent = "Login realizado com sucesso!";
        mensagemLogin.classList.add("sucesso");

        sessionStorage.setItem("echampUsuario", usuario);

        setTimeout(() => {
            window.location.href = "area-restrita.html";
        }, 500);
        return;
    }

    mensagemLogin.textContent = "Não foi possível entrar. Confira o usuário/e-mail e a senha e tente novamente.";
    mensagemLogin.classList.add("erro");
});

esqueciSenha.addEventListener("click", function (event) {
    event.preventDefault();
    mensagemLogin.className = "mensagem sucesso";
    mensagemLogin.textContent = "A recuperação de senha será disponibilizada em uma versão futura.";
});
