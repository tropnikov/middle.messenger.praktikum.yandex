import { BaseAPI } from "./baseApi";

export interface IAddUsersData {
  users: number[];
  chatId: number;
}

export class ChatAPI extends BaseAPI {
  create(data: { title: string }) {
    return this.http.post("/chats", {
      data,
    });
  }

  getChats(data: { title?: string; offset?: number; limit?: number }) {
    return this.http.get("/chats", { data });
  }

  getToken(chatId: number) {
    return this.http.post(`/chats/token/${chatId}`, {});
  }

  addUsers(data: IAddUsersData) {
    return this.http.put("/chats/users", {
      data,
    });
  }

  deleteUsers(data: IAddUsersData) {
    return this.http.delete("/chats/users", {
      data,
    });
  }

  getUsers(chatId: number) {
    return this.http.get(`/chats/${chatId}/users`, {});
  }

  uploadAvatar(data: FormData) {
    return this.http.put("/chats/avatar", {
      data,
    });
  }

  delete(chatId: number) {
    return this.http.delete("/chats", {
      data: { chatId },
    });
  }
}
