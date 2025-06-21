import arrowLeft from "@/assets/arrowLeft.svg?raw";
import { Button } from "@/components/Button";
import { SidebarTemplate } from "@/components/Sidebar/template.ts";
import { Block } from "@/framework/Block";
import "./styles.css";
import Router from "@/framework/Router";

export class Sidebar extends Block {
  constructor() {
    super({
      events: {
        click: (e: Event) => {
          e.preventDefault();
          Router.back();
        },
      },
      button: new Button({
        type: "button",
        class: "back-button arrow-button",
        icon: arrowLeft,
        // events: {
        //   click: (e: Event) => {
        //     e.preventDefault();
        //     Router.back();
        //   },
        // },
      }),
    });
  }

  override render() {
    return SidebarTemplate;
  }
}
