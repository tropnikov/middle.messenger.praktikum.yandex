export const ChatsPageTemplate = `
  <div>
      <div class="sidebar">
        {{{ chatsHeader}}}
        <ul class="sidebar__chats">
          {{{ chats }}}
        </ul>
      </div>
      <div class="chats">
        <p class="chats__placeholder">Выберите чат чтобы отправить сообщение</p>
      </div>
  </div>
`;
