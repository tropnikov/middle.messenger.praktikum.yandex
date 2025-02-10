import viteImage from "@/assets/vite.svg";
import { Block } from "@/framework/Block";
import { MainPageTemplate } from "./template";
import { ListItem } from "@/components/ListItem";
import "./styles.css";
import { linksOnMainPage } from "@/utils/pagesData.ts";
import { Link } from "@/components/Link";

export class MainPage extends Block {
  constructor() {
    super({
      title: "Messenger App",
      viteImage,
      links: linksOnMainPage.map(
        (i) =>
          new ListItem({
            ...i,
            class: "nav__item",
            children: new Link({ ...i }),
          }),
      ),
    });
  }

  override render() {
    return MainPageTemplate;
  }
}
