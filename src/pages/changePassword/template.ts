export const ChangePasswordPageTemplate = `
  <div>
      {{{ sidebar}}}

      <div class="change-password">
        <img class="change-password__image" src={{profileImage}} alt="{{title}}" />
        <h1>{{title}}</h1>
        {{{ form }}}
      </div>
  </div>
`;
