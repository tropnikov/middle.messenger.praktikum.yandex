import arrowRight from "@/assets/arrowRight.svg?raw";
import attach from "@/assets/attach.svg?raw";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Block } from "@/framework/Block";
import "./styles.css";
import { MessageInputTemplate } from "./template";
import { Form } from "@/components/Form";

export class MessageInput extends Block {
  constructor() {
    super({
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
          }),
        ],
        button: new Button({
          class: "arrow-button message-input__button",
          type: "submit",
          icon: arrowRight,
        }),
      }),
      fileInput: new Input({
        type: "file",
        name: "file",
        class: "message-input__file-input",
        accept: "image/png, image/jpeg",
        icon: attach,
      }),
      messageInput: new Input({
        type: "text",
        name: "message",
        class: "message-input__text-input",
        placeholder: "Сообщение",
      }),
      button: new Button({
        class: "arrow-button message-input__button",
        type: "submit",
        icon: arrowRight,
      }),
    });
  }

  override render() {
    return MessageInputTemplate;
  }
}
