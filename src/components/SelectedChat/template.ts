export const SelectedChatTemplate = `
    <div class="selected-chat">
      <div class="selected-chat__header">
        <div class="selected-chat__user">
          {{{ chatAvatar }}}

          <h1 class="selected-chat__title">{{selectedChatTitle}}</h1>
        </div>
        <div class="selected-chat__settings">
          {{{ settingsButton }}}
          {{{ popover }}}
        </div>
      </div>
      <div class="selected-chat__messages">
        {{{ messages }}}
      </div>

      <div class="selected-chat__input">
        {{{ messageInput }}}
      </div>

      {{{ addUserModal }}}
      {{{ deleteUserModal }}}
      {{{ deleteChatModal }}}
    </div>
`;
