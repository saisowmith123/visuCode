import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class CardComponent {}
