// ----- Imports ----- //
import { Card } from "./Card.js";
import { formValidationInstances, postsContainer } from "./index.js";

// ----- Constantes ----- //
const ESC_KEY_CODE = "Escape";

// ----- Elementos DOM ----- //
const popupAddPost = document.querySelector("#popup-add-post");
const popupEditInfo = document.querySelector("#popup-edit-info");
const popupFullImage = document.querySelector("#popup-full-image");
const popupForms = [popupAddPost, popupEditInfo];

const openAddPostButton = document.querySelector(".profile__add-button");
const openEditInfoButton = document.querySelector(".profile__edit-button");
const openPopupButtons = [openAddPostButton, openEditInfoButton];

// ----- Funciones ----- //
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_open");
  document.addEventListener("keydown", handleEscKey);

  if (popupElement === popupEditInfo) {
    const nameInput = popupElement.querySelector(".popup__input_type_name");
    const descriptionInput = popupElement.querySelector(
      ".popup__input_type_description",
    );

    nameInput.value = document.querySelector(".profile__name").textContent;
    descriptionInput.value = document.querySelector(
      ".profile__description",
    ).textContent;
  }

  if (popupElement === popupAddPost) {
    const titleInput = popupElement.querySelector(".popup__input_type_name");
    const linkInput = popupElement.querySelector(
      ".popup__input_type_description",
    );

    titleInput.value = "";
    linkInput.value = "";
  }

  if (popupElement !== popupFullImage) {
    const formId = popupElement.getAttribute("id");
    if (formValidationInstances[formId]) {
      formValidationInstances[formId].resetValidation();
    }
  }
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscKey);

  if (popupElement === popupFullImage) {
    const popupImage = popupElement.querySelector(".popup__image");
    const popupImageTitle = popupElement.querySelector(".popup__image-title");

    popupImage.src = "";
    popupImage.alt = "";
    popupImageTitle.textContent = "";
  }
};

const handleEscKey = (event) => {
  if (event.key === ESC_KEY_CODE) {
    const openedPopup = document.querySelector(".popup_open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

const sendPopup = (popupElement) => {
  if (popupElement === popupEditInfo) {
    const nameInput = popupElement.querySelector(".popup__input_type_name");
    const descriptionInput = popupElement.querySelector(
      ".popup__input_type_description",
    );

    document.querySelector(".profile__name").textContent = nameInput.value;
    document.querySelector(".profile__description").textContent =
      descriptionInput.value;
  }

  if (popupElement === popupAddPost) {
    const titleInput = popupElement.querySelector(".popup__input_type_name");
    const linkInput = popupElement.querySelector(
      ".popup__input_type_description",
    );

    const newCardData = {
      name: titleInput.value,
      link: linkInput.value,
    };

    const newPost = new Card(newCardData, "#element-template");
    const newPostElement = newPost.generateCard();
    postsContainer.prepend(newPostElement);
  }

  closePopup(popupElement);
};

const setPopupListeners = () => {
  // Abrir popups
  openPopupButtons.forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      if (buttonElement === openAddPostButton) {
        openPopup(popupAddPost);
      }

      if (buttonElement === openEditInfoButton) {
        openPopup(popupEditInfo);
      }
    });

    // Enter para abrir popups
    buttonElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        buttonElement.click();
      }
    });
  });

  // Envío de formularios
  popupForms.forEach((formElement) => {
    const form = formElement.querySelector(".popup__form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendPopup(formElement);
    });

    // Enter para enviar formularios
    form.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        const submitButton = form.querySelector(".popup__button");
        if (!submitButton.disabled) {
          event.preventDefault();
          form.requestSubmit();
        }
      }
    });
  });

  // Cerrar popups con botón
  document.querySelectorAll(".popup__close-button").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      const popup = closeButton.closest(".popup");
      closePopup(popup);
    });

    // Enter para cerrar
    closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        closeButton.click();
      }
    });
  });

  // Cerrar popups haciendo clic fuera
  document.querySelectorAll(".popup").forEach((popupElement) => {
    popupElement.addEventListener("mousedown", (event) => {
      if (event.target === popupElement) {
        closePopup(popupElement);
      }
    });
  });
};

// ----- Exports ----- //
export { popupForms, openPopup, setPopupListeners };
