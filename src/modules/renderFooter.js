import "./renderFooter.css";
import githubSVG from "../assets/github-mark.svg";

const footerIconAnchor = document.querySelector(".footer-icon > a");

footerIconAnchor.innerHTML = githubSVG;
footerIconAnchor.setAttribute("href", "https://github.com/myinan");
footerIconAnchor.setAttribute("title", "github.com/myinan");
