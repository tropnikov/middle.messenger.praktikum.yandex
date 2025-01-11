export const LinkTemplate = `
<a class="link{{#if modifier}} link_{{modifier}}{{/if}}" href={{href}}>
  {{ text }}
  {{#if icon}}
    {{{icon}}}
  {{/if}}
</a>`;
