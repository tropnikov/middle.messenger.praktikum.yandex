export const FormTemplate = `<form class="form {{class}}">
    <div class="form__inputs">
        {{{ inputs }}}
    </div>

    {{#if formError}}
      <div class="form__error">
        {{formError}}
      </div>
    {{/if}}

    <div class="form__buttons">
        {{{ button }}}
    </div>
</form>
`;
