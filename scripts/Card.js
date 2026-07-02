class Card {
  #cardData;
  #templateSelector;
  #handleCardClick;
  #element;
  #cardImage;
  #cardTitle;
  #likeButton;
  #trashButton;

  constructor(cardData, templateSelector, handleCardClick) {
    this.#cardData = cardData;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
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
      this.#handleCardClick(this.#cardData.name, this.#cardData.link);
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
