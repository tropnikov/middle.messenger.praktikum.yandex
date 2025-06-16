import profileImage from "@/assets/profile.svg";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Sidebar } from "@/components/Sidebar";
import { Block, Props } from "@/framework/Block";
import { editProfileValidationRules } from "@/utils/validationRules";
import { Validator } from "@/utils/Validator";
import "./styles.css";
import { EditProfilePageTemplate } from "./template";
import { IUser, State } from "@/framework/Store";
import UserController from "@/controllers/userController";
import { connect } from "@/utils/connect";
import { IEditProfileData } from "@/api/userApi";

interface IEditProfileViewProps extends Props {
  user: IUser;
}

class EditProfileView extends Block {
  constructor(props: IEditProfileViewProps) {
    const validator = new Validator(editProfileValidationRules);

    const inputFields = [
      {
        name: "email",
        label: "Почта",
        type: "email",
        required: true,
        value: props.user?.email || "",
      },
      {
        name: "login",
        label: "Логин",
        type: "text",
        required: true,
        value: props.user?.login || "",
      },
      {
        name: "first_name",
        label: "Имя",
        type: "text",
        required: true,
        value: props.user?.first_name || "",
      },
      {
        name: "second_name",
        label: "Фамилия",
        type: "text",
        required: true,
        value: props.user?.second_name || "",
      },
      {
        name: "display_name",
        label: "Имя в чате",
        type: "text",
        required: true,
        value: props.user?.display_name || "",
      },
      {
        name: "phone",
        label: "Телефон",
        type: "text",
        required: true,
        value: props.user?.phone || "",
      },
    ];

    super({
      ...props,
      title: props.title,
      sidebar: new Sidebar(),
      profileImage: props?.user?.avatar
        ? `https://ya-praktikum.tech/api/v2/resources${encodeURIComponent(props?.user?.avatar)}`
        : profileImage,
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
        onSubmit: async (data: Record<string, string>) => {
          const editProfileData: IEditProfileData = {
            first_name: data.first_name,
            second_name: data.second_name,
            email: data.email,
            phone: data.phone,
            display_name: data.display_name,
            login: data.login,
          };

          return await UserController.editProfile(editProfileData);
        },
      }),
    });
  }

  override render() {
    return EditProfilePageTemplate;
  }
}

const mapStateToProps = (state: State) => ({
  user: state.user,
  title: state.user?.first_name || "Пользователь",
  profileImage: state.user?.avatar
    ? `https://ya-praktikum.tech/api/v2/resources${encodeURIComponent(state.user?.avatar)}`
    : profileImage,
});

export const EditProfilePage = connect(mapStateToProps)(EditProfileView);
