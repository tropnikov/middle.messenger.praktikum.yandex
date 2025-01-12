import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Block } from "@/framework/Block";
import "./styles.css";
import { FormTemplate } from "./template";

interface IFormProps {
  inputs: Input[];
  button: Button;
  class?: string;
}

export class Form extends Block {
  constructor(props: IFormProps) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          this.onSubmit();
        },
      },
    });
  }

  private validateForm(): boolean {
    const inputs = this.lists.inputs as Input[];
    let isValid = true;

    inputs.forEach((input: Input) => {
      const error = input.validate();
      if (error) {
        isValid = false;
      }
    });

    return isValid;
  }

  private onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    const formData: Record<string, string> = {};
    (this.lists.inputs as Block[]).forEach((input: Block) => {
      const inputElement =
        input.getContent().tagName === "input"
          ? (input.getContent() as HTMLInputElement)
          : (input.getContent().querySelector("input") as HTMLInputElement);
      if (inputElement instanceof HTMLInputElement) {
        formData[inputElement.name] = inputElement.value;
      }
    });

    console.log("Form data:", formData);
  }

  override render() {
    return FormTemplate;
  }
}
