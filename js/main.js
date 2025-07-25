document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("themeToggle");
  const body = document.body;

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    if (toggleInput) {
      toggleInput.checked = theme === "light";
    }
  }

  const savedTheme = localStorage.getItem("user-theme") || "dark";
  applyTheme(savedTheme);

  if (toggleInput) {
    toggleInput.addEventListener("change", () => {
      const newTheme = toggleInput.checked ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("user-theme", newTheme);
    });
  }

  const modal = document.getElementById("auth-modal");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const openAuthBtn = document.getElementById("open-auth-modal"); 
  const closeModalBtns = document.querySelectorAll(".close-auth-modal");

  if (openAuthBtn && modal) {
    openAuthBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  if (closeModalBtns && modal) {
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    });
  }

  if (tabLogin && tabRegister && loginForm && registerForm) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      loginForm.classList.add("active");
      registerForm.classList.remove("active");
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      registerForm.classList.add("active");
      loginForm.classList.remove("active");
    });
  }

  function fecharModal() {
    if (modal) modal.classList.add("hidden");
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = document.getElementById("login-nome").value;
      const senha = document.getElementById("login-senha").value;

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
        } else {
          alert(data.error || "Erro no login");
        }
      } catch (err) {
        alert("Erro na conexão");
        console.error(err);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
    
      const nome = document.getElementById("register-nome").value;
      const email = document.getElementById("register-email").value;
      const senha = document.getElementById("register-senha").value;
      const confirmar = document.getElementById("register-confirmar").value;
    
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
          tabLogin.click();
        } else {
          alert(data.error || "Erro no registro");
        }
      } catch (err) {
        alert("Erro na conexão");
        console.error(err);
      }
    });
    
  }
});
