// ----- Import ----- //
import { openPopup } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _handleLikeButton() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handleOpenFullImage() {
    const popupFullImage = document.querySelector("#popup-full-image");

    popupFullImage.querySelector(".popup__image").src = this._link;
    popupFullImage.querySelector(
      ".popup__image"
    ).alt = `Fotografía de ${this._name}.`;
    popupFullImage.querySelector(".popup__image-title").textContent =
      this._name;
    openPopup(popupFullImage);
  }

  _setEventListeners() {
    //Like
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    //Delete
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    //Full-Image
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenFullImage();
      });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;

    return this._element;
  }
}

// ----- Export ----- //
export { Card };
