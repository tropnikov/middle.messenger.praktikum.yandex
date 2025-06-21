import { Error } from "@/components/Error";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import { ErrorPageTemplate } from "./template";
import { Routes } from "@/framework/Router.ts";
export class ErrorPage extends Block {
  constructor() {
    super({
      error: new Error({
        title: "500",
        subtitle: "Мы уже фиксим",
        link: new Link({ text: "Назад к чатам", link: Routes.MESSENGER }),
      }),
    });
  }

  override render() {
    return ErrorPageTemplate;
  }
}
