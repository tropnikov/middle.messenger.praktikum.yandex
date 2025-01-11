import { Block } from "@/framework/Block";
import "./styles.css";
import { ChatTemplate } from "./template";

export class Chat extends Block {
  override render() {
    return ChatTemplate;
  }
}
