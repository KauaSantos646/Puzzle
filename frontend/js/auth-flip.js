document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("auth-modal");
  const openBtn = document.getElementById("open-auth-modal");
  const closeBtns = document.querySelectorAll(".close-auth-modal");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const formContainer = document.querySelector(".form-container");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.add("show"), 10);
  });

  closeBtns.forEach(btn =>
    btn.addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => modal.classList.add("hidden"), 300);
    })
  );

  tabLogin.addEventListener("click", () => {
    formContainer.classList.remove("flipped");
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
  });

  tabRegister.addEventListener("click", () => {
    formContainer.classList.add("flipped");
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
  });

  registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("register-nome").value;
  const email = document.getElementById("register-email").value;
  const senha = document.getElementById("register-senha").value;
  const confirmar = document.getElementById("register-confirmar").value;
  const errorMsg = document.getElementById("register-error-msg");

  if (senha !== confirmar) {
    errorMsg.textContent = "As senhas não coincidem.";
    errorMsg.style.display = "block";
    return;
  } else {
    errorMsg.style.display = "none";
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });
    const data = await res.json();

    if (res.ok) {
      formCard.classList.remove("flipped");
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      errorMsg.style.display = "none";
    } else {
      errorMsg.textContent = data.error || "Erro no registro";
      errorMsg.style.display = "block";
    }
  } catch (err) {
    errorMsg.textContent = "Erro na conexão";
    errorMsg.style.display = "block";
    console.error(err);
  }
});

});
