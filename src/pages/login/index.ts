import { Authorization } from "@/components/Authorization";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import { Routes } from "@/framework/Router";
import { loginFields } from "@/utils/pagesData.ts";
import { loginValidationRules } from "@/utils/validationRules";
import { Validator } from "@/utils/Validator";
import { LoginPageTemplate } from "./template";
import AuthController from "@/controllers/authController";

export class LoginPage extends Block {
  constructor() {
    const validator = new Validator(loginValidationRules);

    super({
      authorization: new Authorization({
        title: "Вход",
        form: new Form({
          class: "login-form",
          inputs: loginFields.map(
            (i) =>
              new Input({
                ...i,
                class: "input-group",
                validator,
              }),
          ),
          button: new Button({
            class: "button form__button",
            text: "Авторизоваться",
            type: "submit",
          }),
          onSubmit: (formData: Record<string, string>) => {
            return AuthController.login({
              login: formData.login,
              password: formData.password,
            });
          },
        }),
        link: new Link({ text: "Нет аккаунта?", link: Routes.REGISTER }),
      }),
    });
  }

  override render() {
    return LoginPageTemplate;
  }
}
