import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._imageTitle = this._popupElement.querySelector(".popup__image-title");
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageTitle.textContent = name;
    super.open();
  }
}

export { PopupWithImage };
