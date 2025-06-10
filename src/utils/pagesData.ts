export const linksOnMainPage = [
  { text: "Вход", href: "/login" },
  { text: "Регистрация", href: "/register" },
  { text: "Профиль", href: "/profile" },
  { text: "Изменить профиль", href: "/edit-profile" },
  { text: "Изменить пароль", href: "/change-password" },
  { text: "Список чатов", href: "/messenger" },
  { text: "Выбранный чат", href: "/selected-chat" },
  { text: "404", href: "/404" },
  { text: "500", href: "/500" },
];

export const loginFields = [
  { name: "login", label: "Логин", type: "text", required: true },
  { name: "password", label: "Пароль", type: "password", required: true },
];

export const registerFields = [
  { name: "email", label: "Почта", type: "email", required: true },
  { name: "login", label: "Логин", type: "text", required: true },
  { name: "first_name", label: "Имя", type: "text", required: true },
  { name: "second_name", label: "Фамилия", type: "text", required: true },
  { name: "phone", label: "Телефон", type: "text", required: true },
  { name: "password", label: "Пароль", type: "password", required: true },
  {
    name: "repeatPassword",
    label: "Пароль (ещё раз)",
    type: "password",
    required: true,
  },
];

export const profileFields = [
  { name: "email", label: "Почта", value: "pochta@yandex.ru" },
  { name: "login", label: "Логин", value: "ivanivanov" },
  { name: "first_name", label: "Имя", value: "Иван" },
  { name: "second_name", label: "Фамилия", value: "Иванов" },
  { name: "display_name", label: "Имя в чате", value: "Иван" },
  { name: "phone", label: "Телефон", value: "+79099673030" },
];

export const editProfileFields = [
  {
    name: "email",
    label: "Почта",
    type: "email",
    required: true,
    value: "pochta@yandex.ru",
  },
  {
    name: "login",
    label: "Логин",
    type: "text",
    required: true,
    value: "ivanivanov",
  },
  {
    name: "first_name",
    label: "Имя",
    type: "text",
    required: true,
    value: "Иван",
  },
  {
    name: "second_name",
    label: "Фамилия",
    type: "text",
    required: true,
    value: "Иванов",
  },
  {
    name: "display_name",
    label: "Имя в чате",
    type: "text",
    required: true,
    value: "Иван",
  },
  {
    name: "phone",
    label: "Телефон",
    type: "text",
    required: true,
    value: "+79099673030",
  },
];

export const changePasswordFields = [
  {
    name: "oldPassword",
    label: "Старый пароль",
    type: "password",
    required: true,
    value: "123qwe",
  },
  {
    name: "newPassword",
    label: "Новый пароль",
    type: "password",
    required: true,
    value: "123qwe",
  },
  {
    name: "repeatNewPassword",
    label: "Повторите новый пароль",
    type: "password",
    required: true,
    value: "123qwe",
  },
];

export const chats = [
  {
    user: "Андрей",
    message: "Изображение",
    time: "10:00",
    unread: 3,
    href: "/selected-chat",
  },
  {
    user: "Сергей",
    message: "Привет, как дела?",
    time: "09:00",
    unread: 1,
    href: "/selected-chat",
  },
  {
    user: "Маша",
    message: "Придешь сегодня?",
    time: "08:00",
    unread: 0,
    lastYours: true,
    href: "/selected-chat",
  },
  {
    user: "Анна",
    message: "Что делаешь?",
    time: "07:00",
    unread: 1,
    href: "/selected-chat",
  },
  {
    user: "Павел",
    message: "Видео",
    time: "06:00",
    unread: 2,
    href: "/selected-chat",
  },
  {
    user: "тет-а-теты",
    message: "Изображение",
    time: "Вс",
    unread: 0,
    href: "/selected-chat",
  },
  {
    user: "тет-а-теты2",
    message: "Изображение",
    time: "Вс",
    unread: 0,
    href: "/selected-chat",
  },
];

export const messages = [
  {
    text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
    dateTime: "10:00",
    date: "Изображение",
    time: "10:00",
    isYours: false,
    isRead: true,
  },
  {
    text: "Че делаешь?",
    dateTime: "10:00",
    date: "Изображение",
    time: "10:01",
    isYours: false,
    isRead: true,
  },
  {
    text: `Круто!`,
    dateTime: "10:00",
    date: "Изображение",
    time: "10:05",
    isYours: true,
    isRead: true,
  },
];
