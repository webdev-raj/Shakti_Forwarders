document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector("#bottom-header nav");

  menuIcon.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});
