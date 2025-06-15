import { Block } from "@/framework/Block";
import { ButtonTemplate } from "./template";
import "./styles.css";

interface IButtonProps {
  text?: string;
  icon?: string;
  class?: string;
  type?: string;
  onClick?: (value: MouseEvent) => void;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: props?.onClick ? { click: props.onClick } : {},
    });
  }

  override render() {
    return ButtonTemplate;
  }
}
