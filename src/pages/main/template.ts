export const MainPageTemplate = `
  <div>
    <img class="logo" src="{{viteImage}}" alt="Логотип Vite" />
      <h1>{{title}}</h1>
    <nav class="nav">
      <ul class="nav__list">
        {{{ links }}}
      </ul>
    </nav>
  </div>
`;
