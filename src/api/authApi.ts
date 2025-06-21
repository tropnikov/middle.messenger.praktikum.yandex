import { BaseAPI } from "./baseApi";

export interface IAuthRegisterData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IAuthLoginData {
  login: string;
  password: string;
}

export class AuthApi extends BaseAPI {
  register(data: IAuthRegisterData) {
    return this.http.post("/auth/signup", {
      data,
    });
  }

  login(data: IAuthLoginData) {
    return this.http.post("/auth/signin", {
      data,
    });
  }

  getUser() {
    return this.http.get("/auth/user");
  }

  logout() {
    return this.http.post("/auth/logout");
  }
}
