import { Block } from "@/framework/Block";
import "./styles.css";
import { SearchTemplate } from "./template";
import search from "@/assets/search.svg?raw";
import { Input } from "@/components/Input";

export class Search extends Block {
  constructor() {
    super({
      input: new Input({
        class: "sidebar__search",
        type: "search",
        name: "search",
        icon: search,
        label: "Поиск",
      }),
    });
  }

  override render() {
    return SearchTemplate;
  }
}
