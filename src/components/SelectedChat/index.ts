import { Block, Props } from "@/framework/Block";
import "./styles.css";
import { SelectedChatTemplate } from "./template";
import { MessageInput } from "../MessageInput";
import { Validator } from "@/utils/Validator";
import { messageValidationRules } from "@/utils/validationRules";
import Store, { IMessage, State } from "@/framework/Store";
import { Message } from "../Message";
import { connect } from "@/utils/connect";
import { Popover } from "../Popover";
import add from "@/assets/add.svg";
import deleteIcon from "@/assets/delete.svg";
import { Modal } from "../Modal";
import { ModalForm } from "../ModalForm";
import { Button } from "../Button";
import { PopoverItem } from "../Popover/PopoverItem";
import ChatController from "@/controllers/chatController";
import { Avatar } from "../Avatar";

interface ISelectedChatProps extends Props {
  messages: IMessage[];
  selectedChatId: number;
}
class SelectedChatView extends Block {
  constructor(props: ISelectedChatProps) {
    const validator = new Validator(messageValidationRules);

    const addUserModal = new Modal({
      content: new ModalForm({
        modalFormTitle: "Добавить пользователя",
        inputLabel: "Логин",
        inputName: "login",
        submitButtonText: "Добавить",
        onSubmit: (formData: FormData) => {
          if (formData) {
            const login = formData.get("login") as string;
            const chatId = Store?.getState()?.currentChat?.id;
            if (chatId && login) {
              ChatController.addUsers({
                users: [+login],
                chatId,
              });
              addUserModal.close();
            }
          }
        },
      }),
      modifier: "add-user",
      id: "addUserModal",
    });

    const deleteUserModal = new Modal({
      content: new ModalForm({
        modalFormTitle: "Удалить пользователя",
        inputLabel: "Логин",
        inputName: "login",
        submitButtonText: "Удалить",
        onSubmit: (formData: FormData) => {
          if (formData) {
            const login = formData.get("login") as string;
            const chatId = Store?.getState()?.currentChat?.id;
            if (chatId && login) {
              ChatController.deleteUsers({
                users: [+login],
                chatId,
              });
              deleteUserModal.close();
            }
          }
        },
      }),
      modifier: "delete-user",
      id: "deleteUserModal",
    });

    const deleteChatModal = new Modal({
      content: new ModalForm({
        modalFormTitle: "Удалить чат?",
        submitButtonText: "Удалить",
        onSubmit: (formData: FormData) => {
          if (formData) {
            const chatId = Store?.getState()?.currentChat?.id;
            if (chatId) {
              ChatController.delete(chatId);
              deleteChatModal.close();
            }
          }
        },
      }),
    });

    const popover = new Popover({
      id: "settingsPopover",
      items: [
        new PopoverItem({
          icon: add,
          text: "Добавить пользователя",
          onClick: () => addUserModal.open(),
        }),
        new PopoverItem({
          icon: deleteIcon,
          text: "Удалить пользователя",
          onClick: () => deleteUserModal.open(),
        }),
        new PopoverItem({
          icon: deleteIcon,
          iconModifier: "danger",
          text: "Удалить чат",
          onClick: () => deleteChatModal.open(),
        }),
      ],
    });

    super({
      ...props,
      chatAvatar: new Avatar({
        avatar: props.selectedChatAvatar,
        inChat: true,
      }),
      messageInput: new MessageInput({
        name: "message",
        placeholder: "Сообщение",
        validator,
        onSubmit: async (data) => {
          const { message } = data;

          if (message) {
            ChatController.sendMessage({
              content: message,
              type: "message",
            });
          }
        },
      }),
      popover,
      addUserModal,
      deleteUserModal,
      deleteChatModal,
      settingsButton: new Button({
        text: "•••",
        class: "selected-chat__settings_button button_secondary",
        popoverTarget: "settingsPopover",
      }),
    });
  }

  override componentDidUpdate() {
    if (this.props.messages) {
      this.lists.messages = (this.props.messages as IMessage[]).map(
        (i: IMessage) =>
          new Message({
            message: i,
            isYours: i.user_id === this.props.userId,
          }),
      );
    }
    return true;
  }

  override render() {
    return SelectedChatTemplate;
  }
}

const mapStateToProps = (state: State) => ({
  messages: state.currentMessages || [],
  userId: state.user?.id,
  selectedChatTitle: state?.currentChat?.title ?? "",
  selectedChatAvatar: state?.currentChat?.avatar ?? "",
  selectedChatId: state?.currentChat?.id,
});

export const SelectedChat = connect(
  mapStateToProps as (state: State) => Partial<State>,
)(SelectedChatView);
