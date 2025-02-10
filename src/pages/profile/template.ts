export const ProfilePageTemplate = `
  <div>
      {{{ sidebar}}}

      <div class="profile">
        <div class="avatar profile__avatar">
          <label class="avatar__label">
            <div class="avatar__image-wrap">
              <img class="avatar__image" src={{profileImage}} alt="{{title}}" />
            </div>
            <input class="avatar__input" type="file" name="file" accept="image/png, image/jpeg" />
          </label>
        </div>

        <h1>{{title}}</h1>
        <div class="profile__fields">
          {{{ profile }}}
        </div>


        <div class="profile__links">
            {{{ editProfile }}}
            {{{ changePassword }}}
            {{{ logout }}}
        </div>
      </div>
  </div>
`;
