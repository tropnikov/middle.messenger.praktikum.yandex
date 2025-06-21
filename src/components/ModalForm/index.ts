import { Block, Props } from "@/framework/Block";
import { Input } from "../Input";
import { Button } from "../Button";
import "./styles.css";
import { ModalFormTemplate } from "./template";
import { IChat, State } from "@/framework/Store";
import { connect } from "@/utils/connect";
import { ChatMemberText } from "./ChatMemberText";

interface IModalFormProps extends Props {
  modalFormTitle: string;
  modalFormText?: string;
  currentChat?: IChat;
  inputLabel?: string;
  inputName?: string;
  submitButtonText: string;
  onSubmit?: (formData: FormData) => void;
}

class ModalFormView extends Block {
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

  override componentDidUpdate() {
    const currentChat = this.props.currentChat as IChat;
    const members = currentChat?.members;
    if (members) {
      this.lists.members = members.map((member) => {
        return new ChatMemberText({
          member,
        });
      });
    }
    return true;
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

const mapStateToProps = (state: State): Partial<State> => ({
  currentChat: state?.currentChat,
});

export const ModalForm = connect(mapStateToProps)(ModalFormView);
