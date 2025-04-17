import IdeaFrom from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import Modal from "./components/Modal";
import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";

Modal.addEventListeners();

const ideaList = new IdeaList();

const ideaFrom = new IdeaFrom(ideaList);
ideaList.setIdeaForm(ideaFrom);

ideaFrom.render();

document.addEventListener("closemodal", () => {
  ideaFrom.resetFormState(); // ← this will reset editing mode and re-render
});
