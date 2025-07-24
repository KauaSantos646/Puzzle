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
});
