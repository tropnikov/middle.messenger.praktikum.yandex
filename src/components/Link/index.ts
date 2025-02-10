import { LinkTemplate } from "@/components/Link/template.ts";
import { Block } from "@/framework/Block";

interface ILinkProps {
  modifier?: string;
  href: string;
  text: string;
  icon?: string;
}

export class Link extends Block {
  constructor(props: ILinkProps) {
    super({
      ...props,
    });
  }

  override render() {
    return LinkTemplate;
  }
}
