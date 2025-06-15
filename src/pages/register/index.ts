import { Authorization } from "@/components/Authorization";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import { Routes } from "@/framework/Router";
import { registerFields } from "@/utils/pagesData.ts";
import { registerValidationRules } from "@/utils/validationRules";
import { Validator } from "@/utils/Validator";
import { RegisterPageTemplate } from "./template";
import AuthController from "@/controllers/authController";
import { IAuthRegisterData } from "@/api/authApi";

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
          onSubmit: async (data) => {
            const registrationData: IAuthRegisterData = {
              first_name: data.first_name,
              second_name: data.second_name,
              login: data.login,
              email: data.email,
              password: data.password,
              phone: data.phone,
            };

            return await AuthController.register(registrationData);
          },
        }),
        link: new Link({ text: "Войти", link: Routes.AUTH }),
      }),
    });
  }

  override render() {
    return RegisterPageTemplate;
  }
}
