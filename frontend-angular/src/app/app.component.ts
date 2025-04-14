import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mx-auto py-8 px-4">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">VisuCode</h1>
        <p class="text-gray-600">
          Generate visualizations from Python or R code
        </p>
      </header>

      <app-language-selector
        [selectedLanguage]="selectedLanguage"
        (languageChange)="onLanguageChange($event)"
      >
      </app-language-selector>

      <app-code-editor
        [language]="selectedLanguage"
        (codeChange)="onCodeChange($event)"
      >
      </app-code-editor>

      <app-visualization [code]="code" [language]="selectedLanguage">
      </app-visualization>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  code: string = '';
  selectedLanguage: string = 'python';

  constructor(private storageService: LocalStorageService) {
    this.code = this.storageService.getCode(this.selectedLanguage);
    // this.selectedLanguage = this.storageService.getLanguage();
  }

  onCodeChange(code: string): void {
    this.code = code;
    this.storageService.saveCode(this.selectedLanguage, code);
  }

  onLanguageChange(language: string): void {
    this.selectedLanguage = language;
  }
}
