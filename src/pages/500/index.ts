import { Error } from "@/components/Error";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import "./styles.css";
import { ErrorPageTemplate } from "./template";
export class ErrorPage extends Block {
  constructor() {
    super({
      error: new Error({
        title: "500",
        subtitle: "Мы уже фиксим",
        link: new Link({ text: "Назад к чатам", href: "/chats" }),
      }),
    });
  }

  override render() {
    return ErrorPageTemplate;
  }
}
