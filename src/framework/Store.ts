import { EventBus } from "./EventBus";
import { set } from "@/utils/set";
import profileImage from "@/assets/profile.svg";

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  avatar?: string;
  phone?: string;
  email?: string;
  role?: string;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUser;
    time: string | Date;
    content: string;
  };
  members?: IUser[];
}

export interface IMessage {
  chat_id: number;
  content: string;
  file?: {
    content_size: number;
    content_type: string;
    filename: string;
    id: number;
    path: string;
    upload_date: string;
    user_id: number;
  };
  time: string;
  type: string;
  user_id: string;
}

export interface State {
  title?: string;
  chats?: IChat[];
  currentChat?: IChat;
  user?: IUser;
  currentMessages?: IMessage[];
  profileImage: string;
  chatToken?: string;
  connectedChatId?: number;
  formError?: string;
}

export enum StoreEvents {
  Updated = "Updated",
}

class Store extends EventBus {
  private state: State = {
    profileImage,
  };

  getState(): State {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);
    console.log("state", this.state);
    this.emit(StoreEvents.Updated, this.state);
  }
}

export default new Store();
