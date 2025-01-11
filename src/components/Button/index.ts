import { Block } from "@/framework/Block";
import { ButtonTemplate } from "./template";
import "./styles.css";

interface IButtonProps {
  text?: string;
  icon?: string;
  class?: string;
  type?: string;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
    });
  }

  override render() {
    return ButtonTemplate;
  }
}
