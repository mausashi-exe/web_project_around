class Card {
  #cardData;
  #templateSelector;
  #handleCardClick;
  #handleDeleteClick;
  #handleLikeClick;
  #userId;
  #element;
  #cardImage;
  #cardTitle;
  #likeButton;
  #trashButton;
  #likeCount;

  constructor(
    cardData,
    templateSelector,
    userId,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  ) {
    this.#cardData = cardData;
    this.#templateSelector = templateSelector;
    this.#userId = userId;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteClick = handleDeleteClick;
    this.#handleLikeClick = handleLikeClick;
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
      this.#handleLikeClick(this);
    });

    this.#trashButton.addEventListener("click", () => {
      this.#handleDeleteClick(this);
    });

    this.#cardImage.addEventListener("click", () => {
      this.#handleCardClick(this.#cardData.name, this.#cardData.link);
    });
  }

  #updateLikeState() {
    if (this.#cardData.isLiked) {
      this.#likeButton.classList.add("element__like_active");
    } else {
      this.#likeButton.classList.remove("element__like_active");
    }
    if (this.#likeCount) {
      this.#likeCount.textContent = this.#cardData.likes?.length || 0;
    }
  }

  updateLikes(likes) {
    this.#cardData.likes = likes;
    this.#cardData.isLiked = likes.some((like) => like._id === this.#userId);
    this.#updateLikeState();
  }

  generateCard() {
    this.#element = this.#getTemplate();
    this.#cardImage = this.#element.querySelector(".element__image");
    this.#cardTitle = this.#element.querySelector(".element__name");
    this.#likeButton = this.#element.querySelector(".element__like");
    this.#trashButton = this.#element.querySelector(".element__trash");
    this.#likeCount = this.#element.querySelector(".element__like-count");

    this.#cardImage.src = this.#cardData.link;
    this.#cardImage.alt = this.#cardData.name;
    this.#cardTitle.textContent = this.#cardData.name;

    this.#updateLikeState();

    if (this.#cardData.owner?._id !== this.#userId) {
      this.#trashButton.style.display = "none";
    }

    this.#setEventListeners();

    return this.#element;
  }

  getCardId() {
    return this.#cardData._id;
  }

  deleteCard() {
    this.#element.remove();
    this.#element = null;
  }
}

export { Card };
