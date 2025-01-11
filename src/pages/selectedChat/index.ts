import { Block } from "@/framework/Block";
import { SelectedChatPageTemplate } from "./template";
import { ListItem } from "@/components/ListItem";
import "./styles.css";
import { chats, messages } from "@/utils/pagesData.ts";
import { ChatsHeader } from "@/components/ChatsHeader";
import { Chat } from "@/components/Chat";
import { Message } from "@/components/Message";
import { MessageInput } from "@/components/MessageInput";

export class SelectedChatPage extends Block {
  constructor() {
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

      messageInput: new MessageInput(),
    });
  }

  override render() {
    return SelectedChatPageTemplate;
  }
}
