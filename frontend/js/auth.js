document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modal = document.getElementById("auth-modal");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const openAuthBtn = document.getElementById("open-auth-modal");
  const closeModalBtns = document.querySelectorAll(".close-auth-modal");
  const userInfo = document.getElementById("user-info");
  const userNameSpan = document.getElementById("user-name");
  const toggleInput = document.getElementById("themeToggle");
  const formCard = document.querySelector(".form-card");
  const formContainer = document.querySelector(".form-container");

  const applyTheme = (theme) => {
    body.setAttribute("data-theme", theme);
    if (toggleInput) toggleInput.checked = theme === "light";
  };
  const savedTheme = localStorage.getItem("user-theme") || "dark";
  applyTheme(savedTheme);
  if (toggleInput) {
    toggleInput.addEventListener("change", () => {
      const newTheme = toggleInput.checked ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("user-theme", newTheme);
    });
  }

  const abrirModal = () => {
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.add("show"), 10);
  };
  const fecharModal = () => {
    modal.classList.remove("show");
    setTimeout(() => modal.classList.add("hidden"), 300);
  };
  openAuthBtn.addEventListener("click", abrirModal);
  closeModalBtns.forEach(btn => btn.addEventListener("click", fecharModal));

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener("click", () => {
      formCard.classList.remove("flipped");
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
    });
    tabRegister.addEventListener("click", () => {
      formCard.classList.add("flipped");
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
    });
  }

  const mostrarUsuarioLogado = (nome) => {
    userNameSpan.textContent = nome;
    userInfo.classList.remove("hidden");
    openAuthBtn.removeEventListener("click", abrirModal);
    openAuthBtn.addEventListener("click", () => window.location.href = "perfil.html");
  };
  const nomeSalvo = localStorage.getItem("userName");
  if (nomeSalvo) mostrarUsuarioLogado(nomeSalvo);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = loginForm["login-nome"].value;
    const senha = loginForm["login-senha"].value;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, senha }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Bem-vindo, ${data.nome}!`);
        fecharModal();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.nome);
        mostrarUsuarioLogado(data.nome);
      } else alert(data.error || "Erro no login");
    } catch {
      alert("Erro na conexão");
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = registerForm["register-nome"].value;
    const email = registerForm["register-email"].value;
    const senha = registerForm["register-senha"].value;
    const confirmar = registerForm["register-confirmar"].value;

    if (senha !== confirmar) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registrado com sucesso!");
        formCard.classList.remove("flipped");
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
      } else alert(data.error || "Erro no registro");
    } catch {
      alert("Erro na conexão");
    }
  });
});
