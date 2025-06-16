import { Block } from "@/framework/Block";
import { Input } from "../Input";
import { Button } from "../Button";
import "./styles.css";
import { ModalFormTemplate } from "./template";

interface IModalFormProps {
  modalFormTitle: string;
  inputLabel?: string;
  inputName?: string;
  submitButtonText: string;
  onSubmit?: (formData: FormData) => void;
}

export class ModalForm extends Block {
  constructor(props: IModalFormProps) {
    super({
      ...props,
      ...(props.inputLabel &&
        props.inputName && {
          input: new Input({
            label: props.inputLabel,
            class: "input-group",
            name: props.inputName,
            type: "text",
            required: true,
          }),
        }),
      submitButton: new Button({
        type: "submit",
        text: props.submitButtonText,
        class: "button form__button",
      }),
      events: {
        submit: (event: Event) => this.handleSubmit(event),
      },
    });
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const onSubmit = this.props.onSubmit as (formData: FormData) => void;
    if (onSubmit) {
      onSubmit(formData);
      form.reset();
    }
  }

  override render() {
    return ModalFormTemplate;
  }
}
