export const InputTemplate = `
<div class="{{class}}{{#if error}} {{class}}_error{{/if}}">
  {{#if accept}}
    <label for="{{name}}" class="label label_{{name}}">
      <div class="icon-wrapper">
        {{{icon}}}
      </div>
    {{{ inputField }}}
    </label>
  {{else}}
    {{{ inputField }}}
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
  {{#if error}}
    <span class="{{class}}__error">{{error}}</span>
  {{/if}}
</div>
`;
