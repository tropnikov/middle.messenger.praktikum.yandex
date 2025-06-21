export const MessageTemplate = `
<div class="message{{#if isYours}} message_yours{{/if}}">
  <p class="message__content">{{message.content}}</p>
  <div class="message__meta">
    {{#if isYours}}
      {{#if message.is_read}}
        <div class="message__status">
          {{{ readIcon }}}
        </div>
      {{else}}
        <div class="message__status">
          {{{ sentIcon }}}
        </div>
      {{/if}}
    {{/if}}
    <p class="message__time">{{time}}</p>
  </div>
</div>
`;
