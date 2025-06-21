import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import "./styles.css";
import { ChatsHeaderTemplate } from "./template";
import arrow from "@/assets/arrow.svg?raw";
import { Search } from "@/components/Search";
import { Routes } from "@/framework/Router.ts";
import addIcon from "@/assets/add.svg?raw";
import { CreateChatButton } from "../CreateChatButton";

export class ChatsHeader extends Block {
  constructor() {
    super({
      createChatButton: new CreateChatButton({
        createButton: {
          icon: addIcon,
          class: "sidebar__create-chat-button",
        },
        modalId: "createChatModal-header",
      }),
      link: new Link({ text: "Профиль", link: Routes.PROFILE, icon: arrow }),
      search: new Search(),
    });
  }

  override render() {
    return ChatsHeaderTemplate;
  }
}
