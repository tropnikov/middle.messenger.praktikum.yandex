export const PopoverItemTemplate = `
  <button class="popover__item">
    <img src="{{this.icon}}" alt="{{this.text}}" class="popover__item-icon{{#if iconModifier}} popover__item-icon_{{iconModifier}}{{/if}}" />
    <span>{{this.text}}</span>
  </button>
`;
