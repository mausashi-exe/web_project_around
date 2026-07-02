import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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

const popupWithImage = new PopupWithImage("#popup-full-image");
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(cardData) {
  const card = new Card(cardData, "#element-template", handleCardClick);
  return card.generateCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".elements",
);

section.renderItems();

const editPopup = new PopupWithForm("#popup-edit-info", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues["edit-name"],
    description: inputValues["edit-description"],
  });
  editPopup.close();
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm("#popup-add-post", (inputValues) => {
  const newCardData = {
    name: inputValues["add-title"],
    link: inputValues["add-link"],
  };
  const cardElement = createCard(newCardData);
  section.addItem(cardElement);
  addPopup.close();
});
addPopup.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    const nameInput = document.querySelector("#name-input");
    const descriptionInput = document.querySelector("#description-input");
    nameInput.value = userData.name;
    descriptionInput.value = userData.description;
    editPopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addPopup.open();
});

const editForm = document.querySelector("#popup-edit-info .popup__form");
const editValidator = new FormValidator(configFormValidation, editForm);
editValidator.enableValidation();

const addForm = document.querySelector("#popup-add-post .popup__form");
const addValidator = new FormValidator(configFormValidation, addForm);
addValidator.enableValidation();
