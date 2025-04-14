import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-language-selector',
  template: `
    <div class="flex items-center justify-end mb-4">
      <label class="mr-2 text-sm font-medium">Language:</label>
      <select
        [(ngModel)]="selectedLanguage"
        (ngModelChange)="onLanguageChange($event)"
        class="border rounded px-3 py-1.5 text-sm"
      >
        <option value="python">🐍 Python</option>
        <option value="r">📈 R</option>
      </select>
    </div>
  `,
  styles: [],
})
export class LanguageSelectorComponent implements OnInit {
  @Input() selectedLanguage: string = 'python';
  @Output() languageChange = new EventEmitter<string>();

  constructor(private storageService: LocalStorageService) {}

  ngOnInit(): void {
    // this.selectedLanguage = this.storageService.getLanguage();
  }

  onLanguageChange(language: string): void {
    // this.storageService.saveLanguage(language);
    this.languageChange.emit(language);
  }
}
