export const ModalFormTemplate = `
  <form class="form modal-form">
    <h2 class="modal-form__title">{{ modalFormTitle }}</h2>
    {{#if input}}
      <div class="modal-form__field">
        {{{ input }}}
      </div>
    {{/if}}
    {{{ submitButton }}}
  </form>
`;
