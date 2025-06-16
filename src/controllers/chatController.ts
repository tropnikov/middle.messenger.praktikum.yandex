import { ChatAPI, IAddUsersData } from "@/api/chatApi";
import Store, { IChat } from "@/framework/Store";
import { cloneDeep } from "@/utils/cloneDeep";
import { WebSocketEvents, WSTransport } from "@/utils/wsTransport";
const chatApi = new ChatAPI();

class ChatController {
  private socket: WSTransport | null = null;

  async create(title: string) {
    try {
      await chatApi.create({ title });
      await this.getChats();
    } catch (error) {
      console.error(error, "chat create error");
    }
  }
  async getChats(title?: string) {
    try {
      const chats = await chatApi.getChats({ title: title });
      Store.set("chats", chats);
    } catch (error) {
      console.error(error, "getChats error");
    }
  }

  async addUsers(data: IAddUsersData) {
    try {
      await chatApi.addUsers(data);
      await this.getChats();
    } catch (error) {
      console.error(error, "addUsers error");
    }
  }

  async deleteUsers(data: IAddUsersData) {
    try {
      await chatApi.deleteUsers(data);
      await this.getChats();
    } catch (error) {
      console.error(error, "delete users error");
    }
  }

  async selectChat(chatId: number) {
    const target = Store.getState().chats?.find((chat) => chat.id === chatId);

    Store.set("currentChat", target ? cloneDeep(target) : undefined);
    Store.set("currentMessages", null);

    this.getUsers(chatId);
  }

  async getUsers(chatId: number) {
    try {
      const chatMembers = await chatApi.getUsers(chatId);
      console.log("chatMembers", chatMembers);
    } catch (error) {
      console.error(error, "getUsers error");
    }
  }

  async delete(chatId: number) {
    try {
      await chatApi.delete(chatId);
      Store.set("currentChat", undefined);
      await this.getChats();
    } catch (error) {
      console.error(error, "chat delete error");
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const chat = (await chatApi.uploadAvatar(data)) as IChat;

      const currentChat = Store.getState().currentChat;

      if (currentChat) {
        currentChat.avatar = chat.avatar;
        Store.set("currentChat", currentChat);
      }
    } catch (error) {
      console.error(error, "change avatar error");
    }
  }

  async getToken(chatId: number) {
    return chatApi.getToken(chatId);
  }

  async connect(chatId: number) {
    if (this.socket) {
      this.socket.close();
    }

    try {
      const { token } = (await chatApi.getToken(chatId)) as { token: string };
      const userId = Store.getState().user?.id;

      if (!token) {
        throw new Error("Не удалось получить токен для подключения к чату");
      }

      Store.set("chatToken", token);
      Store.set("connectedChatId", chatId);

      this.socket = new WSTransport(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
      );

      await this.socket.connect();
      this.socket.send({
        content: "0",
        type: "get old",
      });

      this.socket.on(WebSocketEvents.Message, (messages) => {
        if (Array.isArray(messages)) {
          Store.set("currentMessages", [
            ...messages.reverse(),
            ...(Store.getState().currentMessages || []),
          ]);
        } else {
          Store.set("currentMessages", [
            ...(Store.getState().currentMessages || []),
            messages,
          ]);
        }

        this.getChats();
      });
    } catch (error) {
      console.error(error, "connect error");
      throw new Error("Не удалось подключиться к чату");
    }
  }

  sendMessage(data: unknown) {
    if (this.socket) {
      this.socket.send(data);
    }
  }
}

export default new ChatController();
