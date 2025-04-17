import IdeasAPI from "../services/ideasApi";
import Modal from "./Modal";
import IdeaFrom from "./IdeaForm";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    this._ideas = [];
    this.getIdeas();

    this._ideaForm = null;

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  setIdeaForm(formInstance) {
    this._ideaForm = formInstance;
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
      if (e.target.classList.contains("fa-pencil")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.onEditIdea(ideaId);
      }
    });
  }

  onEditIdea(ideaId) {
    const idea = this._ideas.find((i) => i._id === ideaId);
    if (!idea) return;

    this._ideaForm.setEditMode(idea);
    Modal.onOpenModal();
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeasAPI.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }

  async getIdeas() {
    try {
      const res = await IdeasAPI.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(newIdea) {
    this._ideas.push(newIdea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";

    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  updateIdeaInList(updatedIdea) {
    const index = this._ideas.findIndex((idea) => idea._id === updatedIdea._id);
    if (index !== -1) {
      this._ideas[index] = updatedIdea;
      this.render();
    }
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const isAuthor = idea.username === localStorage.getItem("username");
        const deleteBtn = isAuthor
          ? `<button class="delete"><i class="fas fa-times"></i></button>`
          : "";
        const editBtn = isAuthor
          ? `<button class="edit"><i class="fas fa-pencil"></i></button>`
          : "";
        return `
        <div class="card" data-id="${idea._id}">
        ${deleteBtn}
        ${editBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
        `;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
