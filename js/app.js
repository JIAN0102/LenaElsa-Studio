window.addEventListener("DOMContentLoaded", () => {
  fetch("./layout/menu.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementById("menu").innerHTML = data;

      document.getElementById("menu-toggle").addEventListener(
        "click",
        () => {
          document.querySelector("aside").classList.toggle("is-open");
        },
        { passive: true }
      );

      document.querySelectorAll(".menu-title").forEach((title) => {
        title.addEventListener("click", function () {
          this.parentNode.classList.toggle("is-active");
        });
      });
    });

  fetch("./layout/header.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      const toggleTheme = () => {
        const theme = localStorage.getItem("theme");
        const htmlClassList = document.documentElement.classList;
        const isDark = theme === "dark";
        htmlClassList.toggle("dark", !isDark);
        htmlClassList.toggle("light", isDark);
        localStorage.setItem("theme", isDark ? "light" : "dark");
      };
      document
        .getElementById("theme-toggle")
        .addEventListener("click", toggleTheme, { passive: true });
    });

  const storagedTheme = localStorage.getItem("theme");
  const htmlClassList = document.documentElement.classList;
  const DARK = "dark";
  const LIGHT = "light";
  const isDark =
    storagedTheme === DARK ||
    (!storagedTheme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  htmlClassList.toggle(LIGHT, !isDark);
  htmlClassList.toggle(DARK, isDark);
  if (!storagedTheme) {
    localStorage.setItem("theme", isDark ? DARK : LIGHT);
  }
});
