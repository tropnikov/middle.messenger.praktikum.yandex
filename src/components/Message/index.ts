import readIcon from "@/assets/read.svg?raw";
import sentIcon from "@/assets/sent.svg?raw";
import { Block } from "@/framework/Block";
import "./styles.css";
import { MessageTemplate } from "./template";

interface IMessageProps {
  text: string;
  time: string;
  isYours: boolean;
  isRead: boolean;
}

export class Message extends Block {
  constructor(props: IMessageProps) {
    super({ ...props, sentIcon, readIcon });
  }

  override render() {
    return MessageTemplate;
  }
}
