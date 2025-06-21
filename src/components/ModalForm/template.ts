export const ModalFormTemplate = `
  <form class="form modal-form">
    <div class="modal-form__content">
      <h2 class="modal-form__title">{{ modalFormTitle }}</h2>
      {{#if modalFormText}}
        <div class="modal-form__members">
          <p class="modal-form__members-text">{{ modalFormText }}</p>
            {{{ members }}}
          </div>
      {{/if}}
    </div>
    {{#if input}}
      <div class="modal-form__field">
        {{{ input }}}
      </div>
    {{/if}}
    {{{ submitButton }}}
  </form>
`;
