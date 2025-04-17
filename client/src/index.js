import IdeaFrom from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import Modal from "./components/Modal";
import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";

Modal.addEventListeners();

/* 
const ideaList = new IdeaList();
const ideaFrom = new IdeaFrom(ideaList);
ideaList.setIdeaForm(ideaFrom);

 manually wiring dependencies together in index.js, which is a very typical thing in JavaScript. 
 It's not wrong, but can get messy and tight-coupled as the app grows.
 */

const ideaList = new IdeaList();

const ideaFrom = new IdeaFrom(ideaList);
ideaList.setIdeaForm(ideaFrom);

ideaFrom.render();

document.addEventListener("closemodal", () => {
  ideaFrom.resetFormState(); // ← this will reset editing mode and re-render
});
