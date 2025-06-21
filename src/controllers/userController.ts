import { IChangePasswordData, UserApi, IEditProfileData } from "@/api/userApi";
import store from "@/framework/Store";
import Router, { Routes } from "@/framework/Router";
import AuthController from "./authController";

const userApi = new UserApi();

class UserController {
  async editProfile(data: IEditProfileData) {
    try {
      const newProfileData = await userApi.editProfile(data);
      store.set("user", newProfileData);
      Router.go(Routes.PROFILE);
    } catch (error) {
      console.error(error, "edit profile error");
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await userApi.uploadAvatar(data);
      await AuthController.getUser();
    } catch (error) {
      console.error(error, "change avatar error");
    }
  }

  async changePassword(data: IChangePasswordData) {
    try {
      await userApi.changePassword(data);
      Router.go(Routes.PROFILE);
    } catch (error) {
      console.error(error, "change password error");
    }
  }
}

export default new UserController();
