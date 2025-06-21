import arrowRight from "@/assets/arrowRight.svg?raw";
import attach from "@/assets/attach.svg?raw";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Block } from "@/framework/Block";
import { Validator } from "@/utils/Validator";
import "./styles.css";
import { MessageInputTemplate } from "./template";

interface IMessageInputProps {
  name?: string;
  placeholder?: string;
  validator?: Validator;
  onSubmit?: (
    formData: Record<string, string>,
    form: HTMLFormElement,
  ) => Promise<void>;
}

export class MessageInput extends Block {
  constructor(props: IMessageInputProps = {}) {
    super({
      ...props,
      form: new Form({
        class: "message-input__form",
        inputs: [
          new Input({
            type: "file",
            name: "file",
            class: "message-input__file-input",
            accept: "image/png, image/jpeg",
            icon: attach,
          }),
          new Input({
            type: "text",
            name: "message",
            class: "message-input__text-input",
            placeholder: "Сообщение",
            validator: props.validator,
          }),
        ],
        button: new Button({
          class: "arrow-button message-input__button",
          type: "submit",
          icon: arrowRight,
        }),
        onSubmit: async (
          formData: Record<string, string>,
          form: HTMLFormElement,
        ) => {
          await props.onSubmit?.(formData, form);
          form.reset();
        },
      }),
    });
  }

  override render() {
    return MessageInputTemplate;
  }
}
