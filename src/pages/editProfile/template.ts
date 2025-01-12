export const EditProfilePageTemplate = `
  <div>
      {{{ sidebar}}}

      <div class="profile">
        <img class="profile__image" src={{profileImage}} alt="{{title}}" />
        <h1>{{title}}</h1>
        {{{ form }}}
      </div>
  </div>
`;
