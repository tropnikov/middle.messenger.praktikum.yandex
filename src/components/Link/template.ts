export const LinkTemplate = `
<a class="link{{#if modifier}} link_{{modifier}}{{/if}}" {{#if href}}href={{href}}{{/if}}>
  {{ text }}
  {{#if icon}}
    {{{icon}}}
  {{/if}}
</a>`;
