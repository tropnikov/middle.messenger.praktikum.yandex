import { LinkTemplate } from "@/components/Link/template.ts";
import { Block } from "@/framework/Block";
import Router from "@/framework/Router";

interface ILinkProps {
  modifier?: string;
  href?: string;
  text: string;
  icon?: string;
  link?: string;
}

export class Link extends Block {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events:
        props.link !== undefined
          ? {
              click: (e: Event) => {
                e.preventDefault();
                if (props.link) {
                  Router.go(props.link);
                }
              },
            }
          : {},
    });
  }

  override render() {
    return LinkTemplate;
  }
}
