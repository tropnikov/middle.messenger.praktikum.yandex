import { Block } from "@/framework/Block";
import { ChatTemplate } from "./template";
import { Props } from "@/framework/Block";
import { IChat } from "@/framework/Store";
import profileImage from "@/assets/profile.svg";
import { RESOURCES_URL } from "@/utils/constants";

interface IChatProps extends Props {
  isCurrent?: boolean;
  chat: IChat;
  events?: {
    click: () => void;
  };
  onClick?: (chatId: number) => void;
}

export class Chat extends Block {
  constructor(props: IChatProps) {
    super({
      ...props,
      id: props.chat.id,
      isCurrent: props?.isCurrent || false,
      avatar: props.chat.avatar
        ? `${RESOURCES_URL}${encodeURIComponent(props.chat.avatar)}`
        : profileImage,
      lastMessageTime: props.chat.last_message?.time
        ? new Date(props.chat.last_message.time).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : "",
      events: {
        click: (e: MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          const id = +target.id;
          if (props.onClick) {
            props.onClick(id);
          }
        },
      },
    });
  }

  override render() {
    return ChatTemplate;
  }
}
