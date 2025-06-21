import { Block } from "@/framework/Block";
import "./styles.css";
import { IButtonProps } from "@/components/Button";
import { CreateChatButtonTemplate } from "./template";
import { Modal } from "@/components/Modal";
import { ModalForm } from "@/components/ModalForm";
import ChatController from "@/controllers/chatController";
import { Button } from "@/components/Button";

interface ICreateChatButtonProps {
  createButton?: IButtonProps;
  modalId?: string;
}

export class CreateChatButton extends Block {
  private modal: Modal;

  constructor(props: ICreateChatButtonProps) {
    const createChatForm = new ModalForm({
      modalFormTitle: "Создать новый чат",
      inputLabel: "Название чата",
      inputName: "title",
      submitButtonText: "Создать",
      onSubmit: (formData: FormData) => {
        const title = formData.get("title") as string;
        if (title.trim()) {
          ChatController.create(title);
          this.modal.close();
        }
      },
    });

    const modal = new Modal({
      content: createChatForm,
      modifier: "create-chat",
      id: props.modalId || "createChatModal",
    });

    super({
      createButton:
        props?.createButton &&
        new Button({
          ...props.createButton,
          onClick: () => {
            this.modal.open();
          },
        }),
      button: new Button({
        text: "Создать?",
        class: "button_as_link link",
        onClick: () => {
          this.modal.open();
        },
      }),
      modal,
    });

    this.modal = modal;
  }

  override render() {
    return CreateChatButtonTemplate;
  }
}
