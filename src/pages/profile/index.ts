import { Block } from "@/framework/Block";
import { ProfilePageTemplate } from "./template";
import "./styles.css";
import { profileFields } from "@/utils/pagesData.ts";
import { ProfileField } from "@/components/ProfileField";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "@/components/Link";

export class ProfilePage extends Block {
  constructor() {
    super({
      title: "Максим",
      sidebar: new Sidebar(),
      profile: profileFields.map((i) => new ProfileField({ ...i })),
      editProfile: new Link({ text: "Изменить данные", href: "/edit-profile" }),
      changePassword: new Link({ text: "Изменить пароль", href: "/change-password" }),
      logout: new Link({ text: "Выйти", href: "/", modifier: "logout" }),
    });
  }

  override render() {
    return ProfilePageTemplate;
  }
}
