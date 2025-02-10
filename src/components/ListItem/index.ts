import { Block } from "@/framework/Block";
import { ListItemTemplate } from "@/components/ListItem/template.ts";

export class ListItem extends Block {
  override render() {
    return ListItemTemplate;
  }
}
