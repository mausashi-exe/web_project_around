// ----- Imports ----- //
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { popupForms, setPopupListeners } from "./utils.js";

// ----- Constantes ----- //
const INITIAL_CARDS_COUNT = 6;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 40;
const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 200;

// ----- Datos iniciales ----- //
const initialCards = [
  {
    name: "Welcome to Fabulous Las Vegas",
    link: "./images/Welcome_Las_Vegas.avif",
  },
  {
    name: "Seattle Space Needle",
    link: "./images/Space_Needle.avif",
  },
  {
    name: "Chicago Cloud Gate",
    link: "./images/Cloud_Gate.avif",
  },
  {
    name: "Santa Monica Pier",
    link: "./images/Santa_Monica_Pier.avif",
  },
  {
    name: "SF Golden Gate",
    link: "./images/Golden_Gate.avif",
  },
  {
    name: "NY Central Park",
    link: "./images/Central_Park.avif",
  },
];

const configFormValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ----- Elementos DOM ----- //
const postsContainer = document.querySelector(".elements");
const formValidationInstances = {};

// ----- Funciones ----- //
const clearPostsContainer = () => {
  while (postsContainer.firstChild) {
    postsContainer.removeChild(postsContainer.firstChild);
  }
};

const renderInitialPosts = () => {
  clearPostsContainer();

  initialCards.forEach((cardData) => {
    const post = new Card(cardData, "#element-template");
    const postElement = post.generateCard();
    postsContainer.append(postElement);
  });
};

const initiateFormsValidation = () => {
  popupForms.forEach((popupForm) => {
    const form = new FormValidator(configFormValidation, popupForm);
    form.enableValidation();
    formValidationInstances[popupForm.getAttribute("id")] = form;
  });
};

// ----- Inicialización ----- //
const initializeApp = () => {
  renderInitialPosts();
  initiateFormsValidation();
  setPopupListeners();
};

// ----- Iniciar aplicación ----- //
document.addEventListener("DOMContentLoaded", initializeApp);

// ----- Exports ----- //
export { postsContainer, formValidationInstances };
