import { Authorization } from "@/components/Authorization";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import { loginFields } from "@/utils/pagesData.ts";
import "./styles.css";
import { LoginPageTemplate } from "./template";

export class LoginPage extends Block {
  constructor() {
    super({
      authorization: new Authorization({
        title: "Вход",
        form: new Form({
          class: "login-form",
          inputs: loginFields.map(
            (i) => new Input({ ...i, class: "input-group" }),
          ),
          button: new Button({
            class: "button form__button",
            text: "Авторизоваться",
          }),
        }),
        link: new Link({ text: "Нет аккаунта?", href: "/register" }),
      }),
    });
  }

  override render() {
    return LoginPageTemplate;
  }
}
