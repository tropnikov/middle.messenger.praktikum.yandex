import { Error } from "@/components/Error";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import { NotFoundPageTemplate } from "./template";
import { Routes } from "@/framework/Router.ts";
export class NotFoundPage extends Block {
  constructor() {
    super({
      error: new Error({
        title: "404",
        subtitle: "Не туда попали",
        link: new Link({ text: "Назад к чатам", link: Routes.MESSENGER }),
      }),
    });
  }

  override render() {
    return NotFoundPageTemplate;
  }
}
