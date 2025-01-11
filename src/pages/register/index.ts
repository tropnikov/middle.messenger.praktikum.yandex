import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Block } from "@/framework/Block";
import { registerFields } from "@/utils/pagesData.ts";
import "./styles.css";
import { RegisterPageTemplate } from "./template";
import { Authorization } from "@/components/Authorization";
import { Link } from "@/components/Link";

export class RegisterPage extends Block {
  constructor() {
    super({
      authorization: new Authorization({
        title: "Вход",
        form: new Form({
          class: "login-form",
          inputs: registerFields.map(
            (i) => new Input({ ...i, class: "input-group" }),
          ),
          button: new Button({
            class: "button form__button",
            text: "Зарегистрироваться",
            type: "submit",
          }),
        }),
        link: new Link({ text: "Войти", href: "/login" }),
      }),
    });
  }

  override render() {
    return RegisterPageTemplate;
  }
}
