import { Error } from "@/components/Error";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import "./styles.css";
import { NotFoundPageTemplate } from "./template";
export class NotFoundPage extends Block {
  constructor() {
    super({
      error: new Error({
        title: "404",
        subtitle: "Не туда попали",
        link: new Link({ text: "Назад к чатам", href: "/chats" }),
      }),
    });
  }

  override render() {
    return NotFoundPageTemplate;
  }
}
