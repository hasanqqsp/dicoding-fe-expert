import "regenerator-runtime";
import "../styles/reset.css";
import "../styles/main.scss";
import "../styles/home.scss";
import "./views/components";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App({
  showButton: document.querySelector(".navbar-toggler"),
  closeButton: document.querySelector(".close-button"),
  sidebar: document.querySelector(".nav-links"),
  overlay: document.querySelector(".overlay"),
  content: document.querySelector("main"),
});
window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
