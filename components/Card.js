export default class Card {
  constructor ({ name, link, isLiked, _id, owner }, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._id = _id;
    this._ownerId = owner;

    this._cardSelector = document.querySelector(cardSelector);

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  toggleLikeButton({ isLiked }) {
    this._isLiked = isLiked;

    if(this._isLiked) {
      this._element.querySelector(".element__like").classList.add("element__like_active");
    } else {
      this._element.querySelector(".element__like").classList.remove("element__like_active");
    }
  }

  _setEventListeners() {
    //Like post
    this._element.querySelector(".element__like").addEventListener("click", () => {
      this._handleLikeClick({ cardId: this._id, isLiked: this._isLiked });
    });

    //Eliminar post
    this._element.querySelector(".element__trash").addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    //Abrir imagen completa
    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  removeCardElement() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector(".element").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(".element__name").title = this._name;
    this._element.querySelector(".element__image").src = this._link;
    this.toggleLikeButton({ isLiked: this._isLiked });

    return this._element;
  }
}