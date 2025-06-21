import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  EditProfilePage,
  ChangePasswordPage,
  ChatsPage,
  NotFoundPage,
  ErrorPage,
} from "@/pages";

import Router, { Routes } from "@/framework/Router";
import AuthController from "./controllers/authController";

export class App {
  public readonly router = Router;

  async render() {
    this.router
      .use(Routes.AUTH, LoginPage)
      .use(Routes.REGISTER, RegisterPage)
      .use(Routes.PROFILE, ProfilePage)
      .use(Routes.SETTINGS, EditProfilePage)
      .use(Routes.CHANGE_PASSWORD, ChangePasswordPage)
      .use(Routes.MESSENGER, ChatsPage)
      .use(Routes.NOT_FOUND, NotFoundPage)
      .use(Routes.ERROR, ErrorPage)
      .start();

    try {
      await AuthController.getUser();
    } catch (error) {
      console.error(error);
      Router.go(Routes.AUTH);
    }
  }
}
