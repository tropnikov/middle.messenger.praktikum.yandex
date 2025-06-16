export const ChatsPageTemplate = `
  <div class="chats-page">
      <div class="sidebar">
        {{{ chatsHeader }}}
        <ul class="sidebar__chats">
          {{{ chats }}}
        </ul>
      </div>
      <div class="chats">
      {{#if currentChat}}
        {{{ selectedChat }}}
      {{else}}
        <p class="chats__placeholder">Выберите чат, чтобы отправить сообщение</p>
      {{/if}}

      </div>
  </div>
`;
