// ----- Import ----- //
import { openPopup } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _handleLikeButton() {
    const likeButton = this._element.querySelector(".element__like");
    likeButton.classList.toggle("element__like_active");

    const isLiked = likeButton.classList.contains("element__like_active");
    likeButton.setAttribute(
      "aria-label",
      isLiked ? "Quitar me gusta" : "Dar me gusta",
    );
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenFullImage() {
    const popupFullImage = document.querySelector("#popup-full-image");
    const popupImage = popupFullImage.querySelector(".popup__image");
    const popupImageTitle = popupFullImage.querySelector(".popup__image-title");

    popupImage.src = this._link;
    popupImage.alt = `Fotografía ampliada de ${this._name}`;
    popupImageTitle.textContent = this._name;

    openPopup(popupFullImage);
  }

  _setEventListeners() {
    // Botón "Me gusta"
    const likeButton = this._element.querySelector(".element__like");
    likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Botón eliminar
    const deleteButton = this._element.querySelector(".element__trash");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    // Imagen para abrir popup
    const imageElement = this._element.querySelector(".element__image");
    imageElement.addEventListener("click", () => {
      this._handleOpenFullImage();
    });

    // Enter para abrir imagen
    imageElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this._handleOpenFullImage();
      }
    });
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    const cardElement = template.content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const nameElement = this._element.querySelector(".element__name");
    const imageElement = this._element.querySelector(".element__image");

    nameElement.textContent = this._name;
    imageElement.src = this._link;
    imageElement.alt = `Fotografía de ${this._name}`;
    imageElement.tabIndex = 0;

    return this._element;
  }
}

// ----- Export ----- //
export { Card };
