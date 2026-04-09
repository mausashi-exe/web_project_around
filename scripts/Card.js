class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);
    const cardElement = templateElement.content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__name");
    this._likeButton = this._element.querySelector(".element__like");
    this._trashButton = this._element.querySelector(".element__trash");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element__like_active");
    });

    this._trashButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._cardImage.addEventListener("click", () => {
      const fullImagePopup = document.querySelector("#popup-full-image");
      const fullImage = fullImagePopup.querySelector(".popup__image");
      const fullImageTitle = fullImagePopup.querySelector(
        ".popup__image-title",
      );

      fullImage.src = this._link;
      fullImage.alt = this._name;
      fullImageTitle.textContent = this._name;

      import("./utils.js").then(({ openPopup }) => {
        openPopup(fullImagePopup);
      });
    });
  }
}

export { Card };
