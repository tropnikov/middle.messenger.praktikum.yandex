export const pageData = {
  "/index.html": {
    title: "Messenger App",
    links: [
      { text: "Вход", href: "/pages/login.html" },
      { text: "Регистрация", href: "/pages/register.html" },
      { text: "Профиль", href: "/pages/profile.html" },
      { text: "Изменить профиль", href: "/pages/edit-profile.html" },
      { text: "Изменить пароль", href: "/pages/change-password.html" },
      { text: "Список чатов", href: "/pages/chats.html" },
      { text: "404", href: "/pages/404.html" },
      { text: "500", href: "/pages/500.html" },
    ],
  },
  "/pages/login.html": {
    title: "Вход",
    inputs: [
      { name: "login", label: "Логин", type: "text", required: true, placeholder: "Логин" },
      { name: "password", label: "Пароль", type: "password", required: true, placeholder: "Пароль" },
    ],
    buttons: [{ text: "Авторизоваться", type: "submit" }],
    links: [{ text: "Нет аккаунта?", href: "/pages/register.html" }],
  },
  "/pages/register.html": {
    title: "Регистрация",
    inputs: [
      { name: "email", label: "Почта", type: "email", required: true },
      { name: "login", label: "Логин", type: "text", required: true },
      { name: "first_name", label: "Имя", type: "text", required: true },
      { name: "second_name", label: "Фамилия", type: "text", required: true },
      { name: "phone", label: "Телефон", type: "text", required: true },
      { name: "new-password", label: "Пароль", type: "password", required: true },
      { name: "repeat-new-password", label: "Пароль (ещё раз)", type: "password", required: true },
    ],
    buttons: [{ text: "Зарегистрироваться", type: "submit" }],
    links: [{ text: "Войти", href: "/pages/login.html" }],
  },
  "/pages/profile.html": {
    title: "Максим",
    fields: [
      { name: "email", label: "Почта", value: "pochta@yandex.ru" },
      { name: "login", label: "Логин", value: "ivanivanov" },
      { name: "first_name", label: "Имя", value: "Иван" },
      { name: "second_name", label: "Фамилия", value: "Иванов" },
      { name: "nickname", label: "Имя в чате", value: "Иван" },
      { name: "phone", label: "Телефон", value: "+7 (909) 967 30 30" },
    ],
    buttons: [],
    links: [
      { text: "Изменить данные", href: "/pages/edit-profile.html" },
      { text: "Изменить пароль", href: "/pages/change-password.html" },
      { text: "Выйти", href: "/index.html", modifier: "logout" },
    ],
  },
  "/pages/edit-profile.html": {
    title: "Максим",
    inputs: [
      { name: "email", label: "Почта", type: "email", required: true, value: "pochta@yandex.ru" },
      { name: "login", label: "Логин", type: "text", required: true, value: "ivanivanov" },
      { name: "first_name", label: "Имя", type: "text", required: true, value: "Иван" },
      { name: "second_name", label: "Фамилия", type: "text", required: true, value: "Иванов" },
      { name: "nickname", label: "Имя в чате", type: "text", required: true, value: "Иван" },
      { name: "phone", label: "Телефон", type: "password", required: true, value: "+7 (909) 967 30 30" },
    ],
    buttons: [{ text: "Сохранить", type: "submit" }],

    links: [],
  },
  "/pages/change-password.html": {
    title: "Максим",
    inputs: [
      { name: "password", label: "Старый пароль", type: "password", required: true, value: "⋅⋅⋅⋅⋅⋅" },
      { name: "new-password", label: "Новый пароль", type: "password", required: true, value: "⋅⋅⋅⋅⋅⋅" },
      {
        name: "repeat-new-password",
        label: "Повторите новый пароль",
        type: "password",
        required: true,
        value: "⋅⋅⋅⋅⋅⋅",
      },
    ],
    buttons: [{ text: "Сохранить", type: "submit" }],
    links: [],
  },
  "/pages/404.html": {
    title: "404",
    subtitle: "Не туда попали",
    links: [{ text: "Назад к чатам", href: "/pages/chats.html" }],
  },
  "/pages/500.html": {
    title: "500",
    subtitle: "Мы уже фиксим",
    links: [{ text: "Назад к чатам", href: "/pages/chats.html" }],
  },
  "/pages/chats.html": {
    title: "Список чатов",
  },
};
