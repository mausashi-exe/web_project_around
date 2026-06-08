class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #inputList;
  #buttonElement;

  constructor(config, formSelector) {
    this.#formSelector = formSelector;
    this.#inputSelector = config.inputSelector;
    this.#submitButtonSelector = config.submitButtonSelector;
    this.#inactiveButtonClass = config.inactiveButtonClass;
    this.#inputErrorClass = config.inputErrorClass;
    this.#errorClass = config.errorClass;
    this.#inputList = Array.from(
      this.#formSelector.querySelectorAll(this.#inputSelector),
    );
    this.#buttonElement = this.#formSelector.querySelector(
      this.#submitButtonSelector,
    );
  }

  enableValidation() {
    this.#setEventListeners();
  }

  resetValidation() {
    this.#inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
    });
    this.#toggleButtonState();
  }

  #setEventListeners() {
    this.#toggleButtonState();

    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#buttonElement.classList.add(this.#inactiveButtonClass);
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
      this.#buttonElement.disabled = false;
    }
  }

  #hasInvalidInput() {
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formSelector.querySelector(
      `.${inputElement.id}-error`,
    );
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.classList.add(this.#errorClass);
    errorElement.textContent = errorMessage;
  }

  #hideInputError(inputElement) {
    const errorElement = this.#formSelector.querySelector(
      `.${inputElement.id}-error`,
    );
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = "";
  }
}

export { FormValidator };
