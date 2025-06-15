import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Sidebar } from "@/components/Sidebar";
import { Block, Props } from "@/framework/Block";
import { changePasswordValidationRules } from "@/utils/validationRules";
import { Validator } from "@/utils/Validator";
import "./styles.css";
import { ChangePasswordPageTemplate } from "./template";
import Store, { State } from "@/framework/Store";
import { connect } from "@/utils/connect";
import { IChangePasswordData } from "@/api/userApi";
import UserController from "@/controllers/userController";

interface IChangePasswordViewProps extends Props {
  title: string;
}

export class ChangePasswordView extends Block {
  constructor(props: IChangePasswordViewProps) {
    const validator = new Validator(changePasswordValidationRules);

    const inputFields = [
      {
        name: "oldPassword",
        label: "Старый пароль",
        type: "password",
        required: true,
      },
      {
        name: "newPassword",
        label: "Новый пароль",
        type: "password",
        required: true,
      },
      {
        name: "repeatNewPassword",
        label: "Повторите новый пароль",
        type: "password",
        required: true,
      },
    ];

    super({
      title: props.title,
      sidebar: new Sidebar(),
      profileImage: props?.profileImage || Store.getState().profileImage,
      form: new Form({
        class: "profile-form",
        inputs: inputFields.map(
          (i) => new Input({ ...i, class: "input-group", validator }),
        ),
        button: new Button({
          text: "Сохранить",
          type: "submit",
          class: "button form__button",
        }),
        onSubmit: async (data) => {
          const changePasswordData: IChangePasswordData = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          };

          return await UserController.changePassword(changePasswordData);
        },
      }),
    });
  }

  override render() {
    return ChangePasswordPageTemplate;
  }
}

const mapStateToProps = (state: State) => ({
  title: state.user?.first_name || "Пользователь",
  profileImage:
    state.user?.avatar &&
    `https://ya-praktikum.tech/api/v2/resources${encodeURIComponent(state.user?.avatar)}`,
});

export const ChangePasswordPage = connect(mapStateToProps)(ChangePasswordView);
