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
  authorization: "b4b4617b-f69c-4e5f-b01f-69dbca101938",
  "Content-Type": "application/json",
};

export { configFormValidation, serverBaseUrl, serverRequestHeaders };
