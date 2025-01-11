import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import "./styles.css";
import { ChatsHeaderTemplate } from "./template";
import arrow from "@/assets/arrow.svg?raw";
import { Search } from "@/components/Search";

export class ChatsHeader extends Block {
  constructor() {
    super({
      link: new Link({ text: "Профиль", href: "/profile", icon: arrow }),
      search: new Search(),
    });
  }

  override render() {
    return ChatsHeaderTemplate;
  }
}
