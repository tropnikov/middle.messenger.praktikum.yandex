import { Block, Props } from "@/framework/Block";
import "./styles.css";
import { PopoverTemplate } from "./template";
import { PopoverItem } from "./PopoverItem";

interface IPopoverProps extends Props {
  items: PopoverItem[];
  id: string;
}

export class Popover extends Block {
  constructor(props: IPopoverProps) {
    super({
      ...props,
      id: props.id,
    });
  }

  componentDidUpdate() {
    this.lists.items = this.props.items as PopoverItem[];
    return true;
  }

  override render() {
    return PopoverTemplate;
  }
}
