import { Block } from "@/framework/Block";
import "./styles.css";
import { InputTemplate } from "./template";

interface IInputProps {
  name: string;
  label?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  class?: string;
  icon?: string;
  accept?: string;
}

export class Input extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
    });
  }

  override render() {
    return InputTemplate;
  }
}
