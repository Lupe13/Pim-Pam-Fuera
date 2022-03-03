const Toggle = document.querySelector(".toggle")
const navMenu = document.querySelector(".nav-menu")

Toggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible");
});