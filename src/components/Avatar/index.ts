import { Block, Props } from "@/framework/Block";
import "./styles.css";
import { AvatarTemplate } from "./template";
import { InputField } from "@/components/Input/InputField";
import UserController from "@/controllers/userController";
import Store, { State } from "@/framework/Store";
import { connect } from "@/utils/connect";
import ChatController from "@/controllers/chatController";

interface IAvatarViewProps extends Props {
  title: string;
  profileImage?: string;
  inChat?: boolean;
  chatAvatar?: string;
}

export class AvatarView extends Block {
  constructor(props: IAvatarViewProps) {
    super({
      ...props,
      input: new InputField({
        name: "avatar",
        type: "file",
        accept: "image/png, image/jpeg",
        class: "avatar__input",
        events: {
          change: (e: Event) => {
            e.preventDefault();
            const formData = new FormData();
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length !== 0) {
              const file = target.files[0];
              formData.append("avatar", file);
              if (props.inChat) {
                const chatId = Store.getState().connectedChatId;
                if (chatId) {
                  formData.append("chatId", chatId.toString());
                  ChatController.changeAvatar(formData);
                }
              } else {
                UserController.changeAvatar(formData);
              }
            }
          },
        },
      }),
    });
  }

  override render() {
    return AvatarTemplate;
  }
}

const mapStateToProps = (state: State) => ({
  profileImage: state.user?.avatar
    ? `https://ya-praktikum.tech/api/v2/resources${encodeURIComponent(state.user?.avatar)}`
    : state.profileImage,
  chatAvatar: state.currentChat?.avatar
    ? `https://ya-praktikum.tech/api/v2/resources${encodeURIComponent(state.currentChat?.avatar)}`
    : state.profileImage,
});

export const Avatar = connect(mapStateToProps)(AvatarView);
