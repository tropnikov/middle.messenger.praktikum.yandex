import { AuthApi, IAuthRegisterData, IAuthLoginData } from "@/api/authApi";
import store from "@/framework/Store";
import Router, { Routes } from "@/framework/Router";

const authApi = new AuthApi();

class AuthController {
  async register(data: IAuthRegisterData) {
    try {
      await authApi.register(data);
      Router.go(Routes.MESSENGER);
    } catch (error) {
      console.error(error, "register error");
    }
  }

  async login(data: IAuthLoginData) {
    try {
      await authApi.login(data);
      const user = await authApi.getUser();
      store.set("user", user);
      Router.go(Routes.MESSENGER);
    } catch (error) {
      console.error(error, "login error");
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
