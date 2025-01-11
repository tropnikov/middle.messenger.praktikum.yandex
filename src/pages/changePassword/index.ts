import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Sidebar } from "@/components/Sidebar";
import { Block } from "@/framework/Block";
import { changePasswordFields } from "@/utils/pagesData.ts";
import "./styles.css";
import { ChangePasswordPageTemplate } from "./template";

export class ChangePasswordPage extends Block {
  constructor() {
    super({
      title: "Максим",
      sidebar: new Sidebar(),
      form: new Form({
        class: "profile-form",
        inputs: changePasswordFields.map(
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
    return ChangePasswordPageTemplate;
  }
}
