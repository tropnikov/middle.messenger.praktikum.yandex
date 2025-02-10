export const SelectedChatPageTemplate = `
  <div>
    <div class="sidebar">
      {{{ chatsHeader }}}
      <ul class="sidebar__chats">
       {{{ chats }}}
      </ul>
    </div>
    <div class="selected-chat">
      <div class="selected-chat__header">
        <div class="selected-chat__user">
          <div class="chat__avatar-image chat__avatar-image_selected"></div>

          <h1 class="selected-chat__title">{{title}}</h1>
        </div>
        <div class="selected-chat__settings">
          <button class="selected-chat__settings_button">•••</button>
        </div>
      </div>
      <div class="selected-chat__messages">
      {{{ messages }}}
      </div>

      <div class="selected-chat__input">
        {{{ messageInput }}}
      </div>
    </div>
  </div>
`;
