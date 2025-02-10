import { Link } from "@/components/Link";
import { Block } from "@/framework/Block";
import "./styles.css";
import { ErrorTemplate } from "./template";

interface IErrorProps {
  title: string;
  subtitle: string;
  link: Link;
}

export class Error extends Block {
  constructor(props: IErrorProps) {
    super({
      ...props,
    });
  }

  override render() {
    return ErrorTemplate;
  }
}
