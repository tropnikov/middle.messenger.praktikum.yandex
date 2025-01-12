import { Authorization } from "@/components/Authorization";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import { registerFields } from "@/utils/pagesData.ts";
import { registerValidationRules } from "@/utils/validationRules";
import { Validator } from "@/utils/Validator";
import { RegisterPageTemplate } from "./template";

export class RegisterPage extends Block {
  constructor() {
    const validator = new Validator(registerValidationRules);

    super({
      authorization: new Authorization({
        title: "Регистрация",
        form: new Form({
          class: "login-form",
          inputs: registerFields.map(
            (i) => new Input({ ...i, class: "input-group", validator }),
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
