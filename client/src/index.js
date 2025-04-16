import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";

const modalBtnEl = document.getElementById("modal-btn");
const modalEl = document.getElementById("modal");

// let modalOpen = false;

function onOpenModal() {
  modalEl.style.display = "block";
}

function onCloseModal() {
  modalEl.style.display = "none";
}

function outSideClick(e) {
  if (e.target === modalEl) {
    onCloseModal();
  }
}

modalBtnEl.addEventListener("click", onOpenModal);
window.addEventListener("click", outSideClick);
