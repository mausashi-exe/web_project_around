Alrededor de los Estados Unidos (Proyecto 12)

Proyecto web interactivo desarrollado durante el Sprint 9 de TripleTen. La aplicación conecta la interfaz con una API REST externa para sincronizar datos de usuario, renderizar tarjetas dinámicamente y gestionar interacciones en tiempo real.

Funcionalidades

- **Carga Dinámica desde Servidor:** Obtención de perfil e imágenes iniciales mediante `Promise.all` e integración con API.
- **Edición de Perfil y Avatar:** Actualización de datos del usuario y foto de perfil enviando solicitudes `PATCH` al servidor.
- **Gestión de Tarjetas:** Creación (`POST`) y eliminación (`DELETE`) de publicaciones con popup de confirmación.
- **Sistema de Likes:** Dar y quitar "me gusta" a las publicaciones en tiempo real (`PUT` / `DELETE`).
- **Mejoras UX:** Animación e indicador visual ("Guardando...", "Creando...", "Eliminando...") en botones durante solicitudes asíncronas.
- **Programación Orientada a Objetos:** Módulos ES6 desacoplados (`Api`, `Card`, `Section`, `Popup`, `PopupWithForm`, `PopupWithImage`, `PopupWithConfirmation`, `UserInfo`, `FormValidator`).

Tecnologías y Técnicas Utilizadas

- HTML5 Semántico
- CSS3 (Metodología BEM, Flexbox, Grid, Responsive Design)
- JavaScript ES6+ (Fetch API, Promises, Clases, Módulos)
- Programación Orientada a Objetos (POO)
