export const ChatTemplate = `
<li class="sidebar__chat{{#if isCurrent}} sidebar__chat_current{{/if}}" id="{{chat.id}}">
  <div class="chat">
    <div class="chat__content">
      <div class="chat__avatar-wrap">
        <img src="{{avatar}}" alt="{{chat.title}}" class="chat__avatar-image" />
      </div>

      <div class="chat__text">
        <p class="chat__content-title">{{chat.title}}</p>
        <div class="chat__content-message-wrap">
          {{#if lastYours}}
            <p class="chat__content-message chat__content-message_yours">Вы:</p>
          {{/if}}
          <p class="chat__content-message">{{chat.last_message.content}}</p>
        </div>
      </div>
    </div>
    <div class="chat__meta">
      <div class="chat__time">{{lastMessageTime}}</div>
      {{#if chat.unread_count}}
        <div class="chat__count">{{chat.unread_count}}</div>
      {{/if}}
    </div>
  </div>
</li>
`;
