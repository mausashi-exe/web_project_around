export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // ----- Verifica la respuesta del servidor ----- //
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  // ----- Metodo para cargar la información del usuario (GET) ----- //
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  // ----- Metodo para cargar los posts iniciales (GET) ----- //
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  // ----- Obtiene toda la informacion inicial de la aplicacion simultáneamente ----- //
  getAppInfo() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // ----- Metodo para editar el perfil (PATCH) ----- //
  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
  }

  // ----- Metodo para agregar un nuevo post (POST) ----- //
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._checkResponse(res))
  }

  // ----- Metodo para eliminar un post (DELETE) ----- //
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  // ----- Metodo para añadir "me gusta" (PUT) ----- //
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  // ----- Metodo para eliminar "me gusta" (DELETE) ----- //
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  // ----- Metodo para actualizar la foto de perfil (PATCH) ----- //
  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => this._checkResponse(res))
  }

}