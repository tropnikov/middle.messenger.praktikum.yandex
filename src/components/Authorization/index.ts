import { Form } from "@/components/Form";
import { Link } from "@/components/Link";
import { Block, Props } from "@/framework/Block";
import "./styles.css";
import { AuthorizationTemplate } from "./template";

interface IAuthorizationProps extends Props {
  title: string;
  form: InstanceType<typeof Form>;
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
