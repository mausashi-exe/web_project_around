import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {
  configFormValidation,
  serverBaseUrl,
  serverRequestHeaders,
} from "../utils/constants.js";

let postsList = null;
let currentUserId = null;

const api = new Api(serverBaseUrl, serverRequestHeaders);

const profileInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__description",
  avatar: ".profile__image",
});

function createCard(item) {
  const post = new Card(
    item,
    "#element-template",
    function handleCardClick(cardData) {
      popupFullImage.open(cardData);
    },
    function handleLikeClick(cardData) {
      const apiRequest = cardData.isLiked
        ? api.removeLike(cardData.cardId)
        : api.addLike(cardData.cardId);
      apiRequest
        .then((postUpdated) => {
          post.toggleLikeButton(postUpdated);
        })
        .catch((err) =>
          console.log(
            `Error en me gusta de la tarjeta ${cardData.cardId}: ${err}`,
          ),
        );
    },
    function handleDeleteClick(postInstance) {
      popupDeletePost.open(postInstance);
    },
    currentUserId,
  );
  return post.generateCard();
}

api
  .getAppInfo()
  .then(([userInfo, initialCards]) => {
    currentUserId = userInfo._id;
    profileInfo.setUserInfo(userInfo);

    postsList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const postElement = createCard(item);
          postsList.addInitialItem(postElement);
        },
      },
      ".elements",
    );

    postsList.renderItems();
  })
  .catch((err) =>
    console.log(`Error al cargar los datos iniciales de la app: ${err}`),
  );

const editInfoValidator = new FormValidator(
  configFormValidation,
  "#popup-edit-info",
);
editInfoValidator.enableValidation();

const addPostValidator = new FormValidator(
  configFormValidation,
  "#popup-add-post",
);
addPostValidator.enableValidation();

const editAvatarValidator = new FormValidator(
  configFormValidation,
  "#popup-profile-picture",
);
editAvatarValidator.enableValidation();

const popupEditInfo = new PopupWithForm("#popup-edit-info", (info) => {
  popupEditInfo.renderLoading(true, "Guardando...");
  api
    .editProfile(info)
    .then((updatedInfo) => {
      profileInfo.setUserInfo(updatedInfo);
      popupEditInfo.close();
    })
    .catch((err) => console.log(`Error al actualizar el perfil: ${err}`))
    .finally(() => popupEditInfo.renderLoading(false));
});
popupEditInfo.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUser = profileInfo.getUserInfo();
    popupEditInfo.setInputValues({
      name: currentUser.name,
      about: currentUser.about,
    });
    editInfoValidator.resetValidation();
    popupEditInfo.open();
  });

const popupEditAvatar = new PopupWithForm("#popup-profile-picture", (info) => {
  popupEditAvatar.renderLoading(true, "Guardando...");
  api
    .updateAvatar(info)
    .then((updatedAvatar) => {
      profileInfo.setUserInfo(updatedAvatar);
      popupEditAvatar.close();
    })
    .catch((err) =>
      console.log(`Error al actualizar la foto de perfil: ${err}`),
    )
    .finally(() => popupEditAvatar.renderLoading(false));
});
popupEditAvatar.setEventListeners();

document.querySelector(".profile__edit-image").addEventListener("click", () => {
  const currentUser = profileInfo.getUserInfo();
  popupEditAvatar.setInputValues({
    avatar: currentUser.avatar,
  });
  editAvatarValidator.resetValidation();
  popupEditAvatar.open();
});

const popupAddPost = new PopupWithForm("#popup-add-post", (item) => {
  popupAddPost.renderLoading(true, "Creando...");
  api
    .addCard(item)
    .then((newPostInfo) => {
      const newPostElement = createCard(newPostInfo);
      postsList.addNewItem(newPostElement);
      popupAddPost.close();
    })
    .catch((err) => console.log(`Error al agregar la tarjeta: ${err}`))
    .finally(() => popupAddPost.renderLoading(false));
});
popupAddPost.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addPostValidator.resetValidation();
  popupAddPost.open();
});

const popupDeletePost = new PopupWithConfirmation(
  "#popup-delete-post",
  (postInstance) => {
    popupDeletePost.renderLoading(true, "Eliminando...");
    api
      .deleteCard(postInstance._id)
      .then(() => {
        postInstance.removeCardElement();
        popupDeletePost.close();
      })
      .catch((err) => console.log(`Error al eliminar la tarjeta: ${err}`))
      .finally(() => popupDeletePost.renderLoading(false));
  },
);
popupDeletePost.setEventListeners();

const popupFullImage = new PopupWithImage("#popup-full-image");
popupFullImage.setEventListeners();
