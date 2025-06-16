import { Block } from "@/framework/Block";
import { ButtonTemplate } from "./template";
import "./styles.css";

export interface IButtonProps {
  text?: string;
  icon?: string;
  class?: string;
  type?: string;
  onClick?: (value: MouseEvent) => void;
  popoverTarget?: string;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: props?.onClick ? { click: props.onClick } : {},
      popoverTarget: props.popoverTarget,
    });
  }

  override render() {
    return ButtonTemplate;
  }
}
