export const ModalTemplate = `
<dialog id="{{id}}" class="modal{{#if modifier}} modal_{{modifier}}{{/if}}" >
    <div class="modal-dialog">
        {{{ content }}}
    </div>
  </dialog>
`;
