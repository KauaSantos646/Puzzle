window.addEventListener("DOMContentLoaded", () => {
    const themeSwitch = document.getElementById("themeSwitch");
    const isDark = localStorage.getItem("theme") === "dark";
  
    document.body.classList.toggle("dark", isDark);
    themeSwitch.checked = isDark;
  
    themeSwitch.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });
  });
  