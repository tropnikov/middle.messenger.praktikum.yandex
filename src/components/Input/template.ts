export const InputTemplate = `
<div class="{{class}}">
  {{#if accept}}
    <label for="{{name}}" class="label label_{{name}}">
      <div class="icon-wrapper">
        {{{icon}}}
      </div>

      <input type="{{type}}" id="{{name}}" name="{{name}}"
          class="input input_{{name}}" {{#if required}}required{{/if}}
          {{#if placeholder}}placeholder={{placeholder}}{{else}}placeholder=" "{{/if}}
          {{#if value}}value="{{value}}"{{/if}}
          {{#if disabled}}disabled{{/if}}
          {{#if accept}}accept="{{accept}}"{{/if}}
        />
    </label>
  {{else}}
    <input type="{{type}}" id="{{name}}" name="{{name}}"
      class="input input_{{name}}" {{#if required}}required{{/if}}
      {{#if placeholder}}placeholder={{placeholder}}{{else}}placeholder=" "{{/if}}
      {{#if value}}value="{{value}}"{{/if}}
      {{#if disabled}}disabled{{/if}}
      {{#if accept}}accept="{{accept}}"{{/if}}
    />
    <label for="{{name}}" class="label label_{{name}}">
      {{#if icon}}
        {{{icon}}}
        {{#if label}}
          <span class="label__text">{{label}}</span>
        {{/if}}
      {{else}}
          {{label}}
        {{/if}}

      </label>
  {{/if}}
</div>
`;
