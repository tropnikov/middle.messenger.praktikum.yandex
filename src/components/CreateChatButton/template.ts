export const CreateChatButtonTemplate = `
<div>
  {{#if createButton}}
    {{{ createButton }}}
  {{else}}
  <li class="create-chat-button">
    <p class="create-chat-button__text">У вас пока нет чатов</p>
    {{{ button }}}
    </li>
  {{/if}}
  {{{ modal }}}
</div>
`;
