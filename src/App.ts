import {
  MainPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  EditProfilePage,
  ChangePasswordPage,
  ChatsPage,
  SelectedChatPage,
  NotFoundPage,
  ErrorPage,
} from "@/pages";

import { Block } from "@/framework/Block";

type Routes =
  | "/"
  | "/login"
  | "/register"
  | "/profile"
  | "/edit-profile"
  | "/change-password"
  | "/chats"
  | "/selected-chat"
  | "/404"
  | "/500";

export class App {
  protected appElement: HTMLElement | null;

  constructor() {
    this.appElement = document.getElementById("app");
  }

  public render() {
    let page: Block | null;

    switch (window.location.pathname as Routes) {
      case "/":
        page = new MainPage();
        break;

      case "/login":
        page = new LoginPage();
        break;

      case "/register":
        page = new RegisterPage();
        break;

      case "/profile":
        page = new ProfilePage();
        break;

      case "/edit-profile":
        page = new EditProfilePage();
        break;

      case "/change-password":
        page = new ChangePasswordPage();
        break;

      case "/chats":
        page = new ChatsPage();
        break;

      case "/selected-chat":
        page = new SelectedChatPage();
        break;

      case "/404":
        page = new NotFoundPage();
        break;

      case "/500":
        page = new ErrorPage();
        break;

      default:
        page = new NotFoundPage();
        break;
    }
    if (this.appElement) {
      this.appElement.replaceChildren(page.getContent());
    }
  }
}
