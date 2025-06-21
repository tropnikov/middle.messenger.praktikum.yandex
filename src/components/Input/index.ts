import { InputField } from "@/components/Input/InputField";
import { Block } from "@/framework/Block";
import { Validator } from "@/utils/Validator";
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
  validator?: Validator;
}

export class Input extends Block {
  constructor(props: IInputProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...restProps } = props;
    super({
      ...props,
      error: "",
      inputField: new InputField({
        ...restProps,
        events: {
          blur: () => {
            this.validate();
          },
        },
      }),
    });
  }

  public validate(): string | null {
    const input = this.element?.querySelector("input");
    if (!input || !this.props.validator) {
      return null;
    }
    const { validator } = this.props as { validator: Validator };

    const error = validator.validate(input.name, input.value);
    this.setProps({ error: error || "" });
    return error;
  }

  override render() {
    return InputTemplate;
  }
}
