import { ProfileFieldTemplate } from "@/components/ProfileField/template.ts";
import { Block } from "@/framework/Block";

interface IProfileFieldProps {
  label: string;
  value: string;
  class?: string;
}

export class ProfileField extends Block {
  constructor(props: IProfileFieldProps) {
    super({
      ...props,
    });
  }

  override render() {
    return ProfileFieldTemplate;
  }
}
