export const ChatTemplate = `
<a class="chat" href={{href}}>
  <div class="chat__content">
    <div class="chat__avatar-image"></div>

    <div class="chat__text">
      <p class="chat__content-title">{{user}}</p>
      <div class="chat__content-message-wrap">
        {{#if lastYours}}
          <p class="chat__content-message chat__content-message_yours">Вы:</p>
        {{/if}}
        <p class="chat__content-message">{{message}}</p>
      </div>
    </div>
  </div>
  <div class="chat__meta">
    <div class="chat__time">{{time}}</div>
    {{#if unread}}
      <div class="chat__count">{{unread}}</div>
    {{/if}}
  </div>
</a>
`;
