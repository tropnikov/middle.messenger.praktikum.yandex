import { Block, Props } from "@/framework/Block";
import "./styles.css";
import { AvatarTemplate } from "./template";
import { InputField } from "@/components/Input/InputField";
import UserController from "@/controllers/userController";
import { State } from "@/framework/Store";
import { connect } from "@/utils/connect";

interface IAvatarViewProps extends Props {
  title: string;
  profileImage?: string;
}

export class AvatarView extends Block {
  constructor(props: IAvatarViewProps) {
    console.log("props", props);
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
              UserController.changeAvatar(formData);
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
  profileImage:
    state.user?.avatar &&
    `https://ya-praktikum.tech/api/v2/resources${encodeURIComponent(state.user?.avatar)}`,
});

export const Avatar = connect(mapStateToProps)(AvatarView);
