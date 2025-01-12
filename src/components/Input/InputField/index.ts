import { Block } from "@/framework/Block.ts";
import "./styles.css";
import { InputFieldTemplate } from "./template.ts";

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
  events?: Record<string, EventListener>;
}

export class InputField extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
    });
  }

  override render() {
    return InputFieldTemplate;
  }
}
