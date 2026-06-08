class Card {
  #cardData;
  #templateSelector;
  #element;
  #cardImage;
  #cardTitle;
  #likeButton;
  #trashButton;

  constructor(cardData, templateSelector) {
    this.#cardData = cardData;
    this.#templateSelector = templateSelector;
  }

  #getTemplate() {
    const templateElement = document.querySelector(this.#templateSelector);
    const cardElement = templateElement.content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  #setEventListeners() {
    this.#likeButton.addEventListener("click", () => {
      this.#likeButton.classList.toggle("element__like_active");
    });

    this.#trashButton.addEventListener("click", () => {
      this.#element.remove();
    });

    this.#cardImage.addEventListener("click", () => {
      const fullImagePopup = document.querySelector("#popup-full-image");
      const fullImage = fullImagePopup.querySelector(".popup__image");
      const fullImageTitle = fullImagePopup.querySelector(
        ".popup__image-title",
      );

      fullImage.src = this.#cardData.link;
      fullImage.alt = this.#cardData.name;
      fullImageTitle.textContent = this.#cardData.name;

      import("./utils.js").then(({ openPopup }) => {
        openPopup(fullImagePopup);
      });
    });
  }

  generateCard() {
    this.#element = this.#getTemplate();
    this.#cardImage = this.#element.querySelector(".element__image");
    this.#cardTitle = this.#element.querySelector(".element__name");
    this.#likeButton = this.#element.querySelector(".element__like");
    this.#trashButton = this.#element.querySelector(".element__trash");

    this.#cardImage.src = this.#cardData.link;
    this.#cardImage.alt = this.#cardData.name;
    this.#cardTitle.textContent = this.#cardData.name;

    this.#setEventListeners();

    return this.#element;
  }
}

export { Card };
