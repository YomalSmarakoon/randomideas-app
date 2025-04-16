class Modal {
  constructor() {
    this._modalBtnEl = document.getElementById("modal-btn");
    this._modalEl = document.getElementById("modal");
    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtnEl.addEventListener("click", this.onOpenModal.bind(this));
    window.addEventListener("click", this.outSideClick.bind(this));
    document.addEventListener('closemodal', () => this.onCloseModal());
  }

  onOpenModal() {
    this._modalEl.style.display = "block";
  }

  onCloseModal() {
    this._modalEl.style.display = "none";
  }

  outSideClick(e) {
    if (e.target === this._modalEl) {
      this.onCloseModal();
    }
  }
}

export default Modal;
