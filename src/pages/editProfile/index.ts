import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Sidebar } from "@/components/Sidebar";
import { Block } from "@/framework/Block";
import { editProfileFields } from "@/utils/pagesData.ts";
import "./styles.css";
import { EditProfilePageTemplate } from "./template";

export class EditProfilePage extends Block {
  constructor() {
    super({
      title: "Максим",
      sidebar: new Sidebar(),
      form: new Form({
        class: "profile-form",
        inputs: editProfileFields.map(
          (i) => new Input({ ...i, class: "input-group" }),
        ),
        button: new Button({
          text: "Сохранить",
          type: "submit",
          class: "button form__button",
        }),
      }),
    });
  }

  override render() {
    return EditProfilePageTemplate;
  }
}
