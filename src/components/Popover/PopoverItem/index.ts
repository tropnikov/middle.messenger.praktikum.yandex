import { Block, Props } from "@/framework/Block";
import "./styles.css";
import { PopoverItemTemplate } from "./template";

export interface IPopoverItemProps extends Props {
  icon: string;
  text: string;
  iconModifier?: string;
  onClick: () => void;
}

export class PopoverItem extends Block {
  constructor(props: IPopoverItemProps) {
    super({
      ...props,
      icon: props.icon,
      text: props.text,
      iconModifier: props.iconModifier,
      events: {
        click: props.onClick,
      },
    });
  }

  override render() {
    return PopoverItemTemplate;
  }
}
