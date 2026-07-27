class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (description) {
      this._descriptionElement.textContent = description;
    }
    if (avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = `Foto de perfil del usuario ${name}`;
    }
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  getUserId() {
    return this._userId;
  }

  setUserId(id) {
    this._userId = id;
  }
}

export { UserInfo };
