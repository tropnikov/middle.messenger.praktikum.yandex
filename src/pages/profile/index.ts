import { Block, Props } from "@/framework/Block";
import { ProfilePageTemplate } from "./template";
import "./styles.css";
import { ProfileField } from "@/components/ProfileField";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "@/components/Link";
import { Routes } from "@/framework/Router";
import { Button } from "@/components/Button";
import authController from "@/controllers/authController";
import { IUser, State } from "@/framework/Store";
import { connect } from "@/utils/connect";
import { Avatar } from "@/components/Avatar";

interface IProfileViewProps extends Props {
  user: IUser;
  title: string;
}

class ProfileView extends Block {
  constructor(props: IProfileViewProps) {
    const profileFieldsList = ProfileView._createProfileFieldsStatic(
      props.user,
    );

    super({
      title: props.title,
      sidebar: new Sidebar(),
      avatar: new Avatar({
        title: props.title,
      }),
      profile: profileFieldsList,
      backToChats: new Link({
        text: "Вернуться к чатам",
        link: Routes.MESSENGER,
      }),
      editProfile: new Link({
        text: "Изменить данные",
        link: Routes.SETTINGS,
      }),
      changePassword: new Link({
        text: "Изменить пароль",
        link: Routes.CHANGE_PASSWORD,
      }),
      logout: new Button({
        text: "Выйти",
        class: "link button_as_link link_logout",
        onClick: () => {
          authController.logout();
        },
      }),
    });
  }

  private static _createProfileFieldsStatic(user: IUser) {
    return [
      new ProfileField({
        label: "Почта",
        value: user?.email || "",
      }),
      new ProfileField({
        label: "Логин",
        value: user?.login || "",
      }),
      new ProfileField({
        label: "Имя",
        value: user?.first_name || "",
      }),
      new ProfileField({
        label: "Фамилия",
        value: user?.second_name || "",
      }),
      new ProfileField({
        label: "Имя в чате",
        value: user?.display_name || "",
      }),
      new ProfileField({
        label: "Телефон",
        value: user?.phone || "",
      }),
    ];
  }

  private _createProfileFields(user: IUser) {
    return ProfileView._createProfileFieldsStatic(user);
  }

  override componentDidUpdate() {
    this.lists.profile = this._createProfileFields(this.props.user as IUser);
    return true;
  }

  override render() {
    return ProfilePageTemplate;
  }
}

const mapStateToProps = (state: State) => ({
  user: state.user,
  title: state.user?.first_name || "Пользователь",
  profileImage: state.profileImage,
});

export const ProfilePage = connect(mapStateToProps)(ProfileView);
