import { IValidationRule, IValidationRules } from "./Validator";

const fieldValidationRules: Record<string, IValidationRule[]> = {
  login: [
    { type: "required", value: "", errorMessage: "Обязательное поле" },
    { type: "min", value: 3, errorMessage: "Минимум 3 символа" },
    { type: "max", value: 20, errorMessage: "Максимум 20 символов" },
    {
      type: "regexp",
      value: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: "Только латиница, цифры, дефис или нижнее подчёркивание",
    },
  ],
  password: [
    { type: "required", value: "", errorMessage: "Обязательное поле" },
    { type: "min", value: 8, errorMessage: "Минимум 8 символов" },
    { type: "max", value: 40, errorMessage: "Максимум 40 символов" },
    {
      type: "regexp",
      value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage:
        "Пароль должен содержать хотя бы одну заглавную букву и цифру",
    },
  ],
  email: [
    { type: "required", value: "", errorMessage: "Обязательное поле" },
    {
      type: "regexp",
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
      errorMessage: "Некорректный email адрес",
    },
  ],

  first_name: [
    { type: "required", value: "", errorMessage: "Обязательное поле" },
    {
      type: "regexp",
      value: /^[A-ZА-Я][a-zа-я-]*$/,
      errorMessage:
        "Только латиница, кириллица или дефис (первая буква заглавная)",
    },
  ],
  second_name: [
    { type: "required", value: "", errorMessage: "Обязательное поле" },
    {
      type: "regexp",
      value: /^[A-ZА-Я][a-zа-я-]*$/,
      errorMessage:
        "Только латиница, кириллица или дефис (первая буква заглавная)",
    },
  ],
  phone: [
    { type: "required", value: "", errorMessage: "Обязательное поле" },
    { type: "min", value: 10, errorMessage: "Минимум 10 символов" },
    { type: "max", value: 15, errorMessage: "Максимум 15 символов" },
    {
      type: "regexp",
      value: /^\+?\d{10,15}$/,
      errorMessage: "Только цифры, может начинаться с +",
    },
  ],
  display_name: [
    { type: "required", value: "", errorMessage: "Обязательное поле" },
    {
      type: "regexp",
      value: /^[A-ZА-Яa-zа-я0-9_-]+$/,
      errorMessage: "Только буквы, цифры, дефис или нижнее подчёркивание",
    },
  ],
  message: [
    {
      type: "required",
      value: "",
      errorMessage: "Сообщение не может быть пустым",
    },
  ],
};

export const loginValidationRules: IValidationRules = {
  login: fieldValidationRules.login,
  password: fieldValidationRules.password,
};

export const registerValidationRules: IValidationRules = {
  login: fieldValidationRules.login,
  email: fieldValidationRules.email,
  first_name: fieldValidationRules.first_name,
  second_name: fieldValidationRules.second_name,
  phone: fieldValidationRules.phone,
  password: fieldValidationRules.password,
  repeatPassword: fieldValidationRules.password,
};

export const editProfileValidationRules: IValidationRules = {
  email: fieldValidationRules.email,
  login: fieldValidationRules.login,
  first_name: fieldValidationRules.first_name,
  second_name: fieldValidationRules.second_name,
  display_name: fieldValidationRules.display_name,
  phone: fieldValidationRules.phone,
};

export const changePasswordValidationRules: IValidationRules = {
  oldPassword: fieldValidationRules.password,
  newPassword: fieldValidationRules.password,
  repeatNewPassword: fieldValidationRules.password,
};

export const messageValidationRules: IValidationRules = {
  message: fieldValidationRules.message,
};
