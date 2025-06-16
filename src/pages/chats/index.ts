import { Block, Props } from "@/framework/Block";
import { ChatsPageTemplate } from "./template";

import "./styles.css";
import { ChatsHeader } from "@/components/ChatsHeader";
import { Chat } from "@/components/Chat";
import { connect } from "@/utils/connect";
import { IChat, State } from "@/framework/Store";
import ChatController from "@/controllers/chatController";
import { CreateChatButton } from "@/components/CreateChatButton";
import { Modal } from "@/components/Modal";
import { ModalForm } from "@/components/ModalForm";
import { SelectedChat } from "@/components/SelectedChat";

interface IChatsViewProps extends Props {
  chats: IChat[];
  modal: Modal;
}

export class ChatsView extends Block {
  constructor(props: IChatsViewProps) {
    const createChatModal = new Modal({
      content: new ModalForm({
        modalFormTitle: "Создать новый чат",
        inputLabel: "Название чата",
        inputName: "title",
        submitButtonText: "Создать",
        onSubmit: () => {
          createChatModal.close();
        },
      }),
      id: "createChatModal",
      modifier: "create-chat",
    });

    super({
      title: "Список чатов",
      chatsHeader: new ChatsHeader(),
      chats:
        props.chats && props.chats?.length > 0
          ? props.chats.map(
              (i) =>
                new Chat({
                  chat: i,
                }),
            )
          : new CreateChatButton({}),
      modal: createChatModal,
      selectedChat: new SelectedChat({
        messages: [],
      }),
    });
  }

  componentDidMount() {
    ChatController.getChats();
  }

  componentDidUpdate() {
    if (
      this.props.chats &&
      Array.isArray(this.props.chats) &&
      this.props.chats.length > 0
    ) {
      this.lists.chats = this.props.chats.map((chat: IChat) => {
        return new Chat({
          chat,
          isCurrent: chat.id === (this.props.currentChat as IChat)?.id,
          onClick: (chatId: number) => {
            ChatController.selectChat(chatId);
            ChatController.connect(chatId);
          },
        });
      });
    }
    return true;
  }

  override render() {
    return ChatsPageTemplate;
  }
}

const mapStateToProps = (state: State) => ({
  chats: state.chats,
  currentChat: state.currentChat,
});

export const ChatsPage = connect(mapStateToProps)(ChatsView);
