import { Block } from "@/framework/Block";
import { ChatTemplate } from "./template";

export class Chat extends Block {
  override render() {
    return ChatTemplate;
  }
}
