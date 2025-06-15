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
}

export interface State {
  title?: string;
  user?: IUser;
  profileImage: string;
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
