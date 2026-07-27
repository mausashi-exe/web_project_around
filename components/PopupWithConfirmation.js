import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmationSubmit) {
    super(popupSelector);
    this._handleConfirmationSubmit = handleConfirmationSubmit;

    this._submitButton = this._popup.querySelector(".popup__button");
    this._initialButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".popup__form").addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleConfirmationSubmit(this._postData);
    });
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._initialButtonText;
    }
  }

  open(postData) {
    super.open();
    this._postData = postData;
  }

  close() {
    super.close();
    this._postData = null;
  }
}