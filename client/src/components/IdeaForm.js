import IdeasAPI from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaFrom {
  constructor(ideaListInstance) {
    this._ideaFromModalEl = document.querySelector("#form-modal");
    this._ideaList = ideaListInstance;
    this._editingIdea = null;
  }

  setEditMode(idea) {
    this._editingIdea = idea;
    this.render();
  }

  resetFormState() {
    this._editingIdea = null;
    this.render();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.onSubmitForm.bind(this));
  }

  onSubmitForm(e) {
    e.preventDefault();
    const isEditMode = this._editingIdea != null;

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all fields");
      return;
    }

    // Save user to local storage
    localStorage.setItem("username", this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    if (isEditMode) {
      this.editIdea(this._editingIdea._id, idea);
    } else {
      this.addIdea(idea);
    }

    // clear form
    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }

  async editIdea(id, idea) {
    try {
      const res = await IdeasAPI.updateIdea(id, idea);

      // update the edited idea in the list
      this._ideaList.updateIdeaInList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async addIdea(idea) {
    try {
      const res = await IdeasAPI.addIdea(idea);

      // add new idea to the list
      this._ideaList.addIdeaToList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const isEditMode = this._editingIdea != null;

    this._ideaFromModalEl.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" value="${
        localStorage.getItem("username") ? localStorage.getItem("username") : ""
      }" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text">${
        isEditMode ? this._editingIdea.text : ""
      }</textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" value="${
        isEditMode ? this._editingIdea.tag : ""
      }"/>
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaFrom;
