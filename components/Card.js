export default class Card {
  constructor(
    { name, link, isLiked, _id, owner },
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    currentUserId,
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._id = _id;
    this._ownerId = typeof owner === "object" ? owner._id : owner;
    this._currentUserId = currentUserId;

    this._cardSelector = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  toggleLikeButton({ isLiked }) {
    this._isLiked = isLiked;
    const likeButton = this._element.querySelector(".element__like");
    if (this._isLiked) {
      likeButton.classList.add("element__like_active");
    } else {
      likeButton.classList.remove("element__like_active");
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeClick({ cardId: this._id, isLiked: this._isLiked });
      });

    const trashButton = this._element.querySelector(".element__trash");
    if (trashButton) {
      trashButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    }

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }

  removeCardElement() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return this._cardSelector.content.querySelector(".element").cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;
    cardImage.alt = `Fotografía de ${this._name}`;

    const cardTitle = this._element.querySelector(".element__name");
    cardTitle.textContent = this._name;
    cardTitle.title = this._name;

    const trashButton = this._element.querySelector(".element__trash");
    if (this._ownerId !== this._currentUserId && trashButton) {
      trashButton.remove();
    }

    this.toggleLikeButton({ isLiked: this._isLiked });
    this._setEventListeners();

    return this._element;
  }
}
