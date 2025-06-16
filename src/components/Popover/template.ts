export const PopoverTemplate = `
  <div class="popover{{#if modifier}}popover_{{modifier}}{{/if}}" id="{{id}}" popover="auto">
    <div class="popover__content">
      {{{items}}}
    </div>
  </div>
`;
