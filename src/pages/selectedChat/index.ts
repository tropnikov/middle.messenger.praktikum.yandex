import { MessageInput } from "@/components/MessageInput";
import { Block } from "@/framework/Block";
import { messageValidationRules } from "@/utils/validationRules";
import { Validator } from "@/utils/Validator";
import { ListItem } from "@/components/ListItem";

import "./styles.css";
import { chats, messages } from "@/utils/pagesData.ts";
import { ChatsHeader } from "@/components/ChatsHeader";
import { Chat } from "@/components/Chat";
import { Message } from "@/components/Message";
import { SelectedChatPageTemplate } from "./template";

export class SelectedChatPage extends Block {
  constructor() {
    const validator = new Validator(messageValidationRules);

    super({
      title: "Андрей",
      chatsHeader: new ChatsHeader(),
      chats: chats.map(
        (i) =>
          new ListItem({
            ...i,
            class: "sidebar__chat",
            children: new Chat({ ...i }),
          }),
      ),
      messages: messages.map((i) => new Message({ ...i })),
      messageInput: new MessageInput({
        name: "message",
        placeholder: "Сообщение",
        validator,
      }),
    });
  }

  override render() {
    return SelectedChatPageTemplate;
  }
}
