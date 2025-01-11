import arrowLeft from "@/assets/arrowLeft.svg?raw";
import { Button } from "@/components/Button";
import { SidebarTemplate } from "@/components/Sidebar/template.ts";
import { Block } from "@/framework/Block";
import "./styles.css";

export class Sidebar extends Block {
  constructor() {
    super({
      button: new Button({
        type: "button",
        class: "back-button arrow-button",
        icon: arrowLeft,
      }),
    });
  }

  override render() {
    return SidebarTemplate;
  }
}
