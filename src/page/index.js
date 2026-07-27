import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";

const configFormValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//  token
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "0b0294a2-f767-4ba3-8451-95f699c2606f",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

let userId = null;

const popupWithImage = new PopupWithImage("#popup-full-image");
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation("#popup-confirmation");
popupWithConfirmation.setEventListeners();

const popupEditProfile = new PopupWithForm(
  "#popup-edit-info",
  (inputValues) => {
    popupEditProfile.renderLoading(true);
    api
      .setUserInfo({
        name: inputValues["edit-name"],
        about: inputValues["edit-description"],
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar,
        });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.error("Error al actualizar perfil:", err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  },
);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm("#popup-add-post", (inputValues) => {
  popupAddCard.renderLoading(true);
  api
    .addCard({
      name: inputValues["add-title"],
      link: inputValues["add-link"],
    })
    .then((cardData) => {
      const cardElement = createCardElement(cardData);
      section.addItem(cardElement);
      popupAddCard.close();
    })
    .catch((err) => {
      console.error("Error al agregar tarjeta:", err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
});
popupAddCard.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(
  "#popup-update-avatar",
  (inputValues) => {
    popupUpdateAvatar.renderLoading(true);
    api
      .setUserAvatar({ avatar: inputValues["avatar-link"] })
      .then((userData) => {
        userInfo.setUserAvatar(userData.avatar);
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.error("Error al actualizar avatar:", err);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
      });
  },
);
popupUpdateAvatar.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteClick(card) {
  popupWithConfirmation.open();
  popupWithConfirmation.setSubmitAction(() => {
    popupWithConfirmation.renderLoading(true);
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.error("Error al eliminar tarjeta:", err);
      })
      .finally(() => {
        popupWithConfirmation.renderLoading(false);
      });
  });
}

function handleLikeClick(card) {
  const cardId = card.getCardId();
  const isLiked = card._cardData?.isLiked;

  const likePromise = isLiked ? api.removeLike(cardId) : api.addLike(cardId);

  likePromise
    .then((updatedCard) => {
      card.updateLikes(updatedCard.likes);
    })
    .catch((err) => {
      console.error("Error al actualizar like:", err);
    });
}

function createCardElement(cardData) {
  const card = new Card(
    cardData,
    "#element-template",
    userId,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  );
  return card.generateCard();
}

const section = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCardElement(cardData);
      section.addItem(cardElement);
    },
  },
  ".elements",
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    userInfo.setUserId(userData._id);
    userId = userData._id;

    section.renderItems(cardsData);
  })
  .catch((err) => {
    console.error("Error al cargar datos iniciales:", err);
  });

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    popupEditProfile.setInputValues({
      "edit-name": userData.name,
      "edit-description": userData.description,
    });
    popupEditProfile.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupAddCard.open();
});

document
  .querySelector(".profile__avatar-container")
  .addEventListener("click", () => {
    popupUpdateAvatar.open();
  });

const editForm = document.querySelector("#popup-edit-info .popup__form");
const addForm = document.querySelector("#popup-add-post .popup__form");
const avatarForm = document.querySelector("#popup-update-avatar .popup__form");
const confirmForm = document.querySelector("#popup-confirmation .popup__form");

const editValidator = new FormValidator(configFormValidation, editForm);
editValidator.enableValidation();

const addValidator = new FormValidator(configFormValidation, addForm);
addValidator.enableValidation();

const avatarValidator = new FormValidator(configFormValidation, avatarForm);
avatarValidator.enableValidation();

const confirmValidator = new FormValidator(configFormValidation, confirmForm);
confirmValidator.enableValidation();
