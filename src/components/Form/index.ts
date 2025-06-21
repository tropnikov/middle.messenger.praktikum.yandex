import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Block, Props } from "@/framework/Block";
import { State } from "@/framework/Store";
import "./styles.css";
import { FormTemplate } from "./template";
import { connect } from "@/utils/connect";

interface IFormViewProps extends Props {
  inputs: Input[];
  button: Button;
  class?: string;
  onSubmit: (
    formData: Record<string, string>,
    form: HTMLFormElement,
  ) => Promise<void>;
  formError?: string;
}

class FormView extends Block {
  constructor(props: IFormViewProps) {
    super({
      ...props,
      formError: props.formError,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          this.onSubmit(e);
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

  private async onSubmit(e: SubmitEvent) {
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

    const { onSubmit } = this.props as unknown as IFormViewProps;
    const form = e.target as HTMLFormElement;
    await onSubmit(formData, form);
  }

  override render() {
    return FormTemplate;
  }
}

const mapStateToProps = (state: State) => ({
  formError: state.formError,
});

export const Form = connect(mapStateToProps)(FormView);
