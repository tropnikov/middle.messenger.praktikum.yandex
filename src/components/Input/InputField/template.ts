export const InputFieldTemplate = `
<input type="{{type}}" id="{{name}}" name="{{name}}"
  class="input input_{{name}} {{class}}" {{#if required}}required{{/if}}
  {{#if placeholder}}placeholder="{{placeholder}}"{{else}}placeholder=" "{{/if}}
  {{#if value}}value="{{value}}"{{/if}}
  {{#if disabled}}disabled{{/if}}
  {{#if accept}}accept="{{accept}}"{{/if}}
/>
`;
