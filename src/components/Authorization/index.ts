import { Form } from "@/components/Form";
import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import "./styles.css";
import { AuthorizationTemplate } from "./template";

interface IAuthorizationProps {
  title: string;
  form: Form;
  link: Link;
}

export class Authorization extends Block {
  constructor(props: IAuthorizationProps) {
    super({
      ...props,
    });
  }

  override render() {
    return AuthorizationTemplate;
  }
}
