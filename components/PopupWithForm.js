import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popup.querySelector(".popup__button");
    this._initialButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    var popupFormValues
    if (this._popup.querySelector(".popup__input_type_name")) {
      popupFormValues = {
      name: this._popup.querySelector(".popup__input_type_name").value,
      link: this._popup.querySelector(".popup__input_type_description").value,
      about: this._popup.querySelector(".popup__input_type_description").value,
      avatar: this._popup.querySelector(".popup__input_type_description").value
    };
    } else {
      popupFormValues = {
      link: this._popup.querySelector(".popup__input_type_description").value,
      about: this._popup.querySelector(".popup__input_type_description").value,
      avatar: this._popup.querySelector(".popup__input_type_description").value
      };
    }
    return popupFormValues;
  }

  setInputValues(type, {name, about, avatar}) {
    if(type === "Profile Info") {
      this._popup.querySelector(".popup__input_type_name").value = name;
      this._popup.querySelector(".popup__input_type_description").value = about;
    } else {
      this._popup.querySelector("#profile-picture-input").value = avatar;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".popup__form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._initialButtonText;
    }
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }

}