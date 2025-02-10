import profileImage from "@/assets/profile.svg";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Sidebar } from "@/components/Sidebar";
import { Block } from "@/framework/Block";
import { editProfileFields } from "@/utils/pagesData.ts";
import { editProfileValidationRules } from "@/utils/validationRules";
import { Validator } from "@/utils/Validator";
import "./styles.css";
import { EditProfilePageTemplate } from "./template";

export class EditProfilePage extends Block {
  constructor() {
    const validator = new Validator(editProfileValidationRules);

    super({
      title: "Максим",
      sidebar: new Sidebar(),
      profileImage,
      form: new Form({
        class: "profile-form",
        inputs: editProfileFields.map(
          (i) => new Input({ ...i, class: "input-group", validator }),
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
