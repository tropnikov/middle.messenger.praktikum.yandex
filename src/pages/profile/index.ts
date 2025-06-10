import profileImage from "@/assets/profile.svg";
import { Block } from "@/framework/Block";
import { ProfilePageTemplate } from "./template";
import "./styles.css";
import { profileFields } from "@/utils/pagesData.ts";
import { ProfileField } from "@/components/ProfileField";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "@/components/Link";
import { Routes } from "@/framework/Router";

export class ProfilePage extends Block {
  constructor() {
    super({
      title: "Максим",
      sidebar: new Sidebar(),
      profileImage,
      profile: profileFields.map((i) => new ProfileField({ ...i })),
      editProfile: new Link({
        text: "Изменить данные",
        link: Routes.SETTINGS,
      }),
      changePassword: new Link({
        text: "Изменить пароль",
        link: Routes.CHANGE_PASSWORD,
      }),
      logout: new Link({
        text: "Выйти",
        link: Routes.AUTH,
        modifier: "logout",
      }),
    });
  }

  override render() {
    return ProfilePageTemplate;
  }
}
