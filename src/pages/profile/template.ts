export const ProfilePageTemplate = `
  <div>
      {{{ sidebar}}}

      <div class="profile">
        {{{ avatar }}}

        <h1>{{title}}</h1>
        <div class="profile__fields">
          {{{ profile }}}
        </div>


        <div class="profile__links">
            {{{ backToChats }}}
            {{{ editProfile }}}
            {{{ changePassword }}}
            {{{ logout }}}
        </div>
      </div>
  </div>
`;
