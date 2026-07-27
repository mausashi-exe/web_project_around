const configFormValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const serverBaseUrl = "https://around-api.es.tripleten-services.com/v1";

const serverRequestHeaders = {
  authorization: "2eb8bf25-039d-4d58-8ca1-0465058366bf",
  "Content-Type": "application/json",
};

export { configFormValidation, serverBaseUrl, serverRequestHeaders };
