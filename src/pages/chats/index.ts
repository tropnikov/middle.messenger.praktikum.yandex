import { Block } from "@/framework/Block";
import { ChatsPageTemplate } from "./template";
import { ListItem } from "@/components/ListItem";
import "./styles.css";
import { chats } from "@/utils/pagesData.ts";
import { ChatsHeader } from "@/components/ChatsHeader";
import { Chat } from "@/components/Chat";

export class ChatsPage extends Block {
  constructor() {
    super({
      title: "Список чатов",
      chatsHeader: new ChatsHeader(),
      chats: chats.map(
        (i) =>
          new ListItem({
            ...i,
            class: "sidebar__chat",
            children: new Chat({ ...i }),
          }),
      ),
    });
  }

  override render() {
    return ChatsPageTemplate;
  }
}
