import readIcon from "@/assets/read.svg?raw";
import sentIcon from "@/assets/sent.svg?raw";
import { Block } from "@/framework/Block";
import "./styles.css";
import { MessageTemplate } from "./template";
import { IMessage } from "@/framework/Store";

interface IMessageProps {
  message: IMessage;
  isYours: boolean;
}

export class Message extends Block {
  constructor(props: IMessageProps) {
    super({
      ...props,
      time: new Date(props.message.time).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      sentIcon,
      readIcon,
    });
  }

  override render() {
    return MessageTemplate;
  }
}
