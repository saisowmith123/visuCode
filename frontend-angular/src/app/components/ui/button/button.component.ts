import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="{
        'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
        'bg-gray-200 hover:bg-gray-300 text-gray-800': variant === 'secondary',
        'opacity-50 cursor-not-allowed': disabled
      }"
      class="px-4 py-2 rounded text-sm font-medium transition-colors"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
}
