import { AuthApi, IAuthRegisterData, IAuthLoginData } from "@/api/authApi";
import store from "@/framework/Store";
import Router, { Routes } from "@/framework/Router";
import Store from "@/framework/Store";

const authApi = new AuthApi();

const errorHandler = (error: unknown) => {
  const err = error as Record<string, string>;
  if (err.reason === "User already in system") {
    Router.go(Routes.MESSENGER);
  }
  console.error(error, "auth error");
  Store.set("formError", err.reason);
};

class AuthController {
  async register(data: IAuthRegisterData) {
    try {
      await authApi.register(data);
      Router.go(Routes.MESSENGER);
      Store.set("formError", undefined);
    } catch (error) {
      errorHandler(error);
    }
  }

  async login(data: IAuthLoginData) {
    try {
      await authApi.login(data);
      const user = await authApi.getUser();
      store.set("user", user);
      Router.go(Routes.MESSENGER);
      Store.set("formError", undefined);
    } catch (error) {
      errorHandler(error);
    }
  }

  async logout() {
    try {
      await authApi.logout();
      Router.go(Routes.AUTH);
    } catch (error) {
      console.error(error, "logout error");
    }
  }

  async getUser() {
    try {
      const user = await authApi.getUser();
      store.set("user", user);
    } catch (error) {
      throw new Error(`failed to get user: ${error}`);
    }
  }
}

export default new AuthController();
