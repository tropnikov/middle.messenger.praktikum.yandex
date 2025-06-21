import { Block } from "@/framework/Block";
import "./styles.css";
import { ChatMemberTextTemplate } from "./template";
import { IUser } from "@/framework/Store";

interface IChatMemberTextProps {
  member: IUser;
}

export class ChatMemberText extends Block {
  constructor(props: IChatMemberTextProps) {
    super({
      ...props,
      member: props.member,
    });
  }

  override render() {
    return ChatMemberTextTemplate;
  }
}
