import { BaseAPI } from "./baseApi";

interface IBaseUser {
  id?: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar?: string;
}

export interface IEditProfileData extends IBaseUser {
  phone: string;
  email: string;
}

export interface IChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UserApi extends BaseAPI {
  uploadAvatar(data: FormData) {
    return this.http.put("/user/profile/avatar", {
      data,
    });
  }

  editProfile(data: IEditProfileData) {
    return this.http.put("/user/profile", {
      data,
    });
  }

  changePassword(data: IChangePasswordData) {
    return this.http.put("/user/password", {
      data,
    });
  }
}
