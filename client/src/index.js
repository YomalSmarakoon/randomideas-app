import IdeaFrom from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import Modal from "./components/Modal";
import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";

new Modal();

const ideaFrom = new IdeaFrom();
ideaFrom.render();

new IdeaList();