export const AvatarTemplate = `
<div class="avatar{{#if inChat}} chat__avatar{{else}} profile__avatar{{/if}}">
  <label class="avatar__label">
    <div class="avatar__image-wrap">
      <img class="avatar__image" src="{{#if inChat}}{{chatAvatar}}{{else}}{{profileImage}}{{/if}}" alt="{{title}}" />
    </div>
    {{{ input }}}
  </label>
</div>
`;
