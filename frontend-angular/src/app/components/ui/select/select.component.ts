import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `
    <label
      class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
      >{{ label }}</label
    >
    <select
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      [value]="selected"
      (change)="onChange($event)"
    >
      <option *ngFor="let option of options" [value]="option.value">
        {{ option.label }}
      </option>
    </select>
  `,
  styles: [],
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() options: { label: string; value: string }[] = [];
  @Input() selected: string = '';
  @Output() selectedChange = new EventEmitter<string>();

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedChange.emit(value);
  }
}
