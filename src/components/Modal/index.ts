import { Block } from "@/framework/Block";
import "./styles.css";
import { ModalTemplate } from "./template";

interface IModalProps {
  content: Block;
  id?: string;
  modifier?: string;
  onClose?: () => void;
}

export class Modal extends Block {
  constructor(props: IModalProps) {
    super({
      ...props,
      content: props.content,
      id: props.id,
      modifier: props.modifier,
    });

    this.setProps({
      events: {
        click: (event: Event) => this.handleClick(event),
      },
    });
  }

  private handleClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal") && target.nodeName === "DIALOG") {
      this.close();
    }
  }

  public open() {
    const dialog = this.getContent() as HTMLDialogElement;

    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  }

  public close() {
    const dialog = this.getContent() as HTMLDialogElement;
    if (dialog && typeof dialog.close === "function") {
      dialog.close();
      const onClose = this.props.onClose as (() => void) | undefined;
      if (onClose) {
        onClose();
      }
    }
  }

  override render() {
    return ModalTemplate;
  }
}
