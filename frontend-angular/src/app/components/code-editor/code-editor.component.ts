import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { AceEditorComponent } from '../ace-editor/ace-editor.component';

@Component({
  selector: 'app-code-editor',
  template: `
    <div class="border rounded-md overflow-hidden">
      <div class="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <h2 class="text-sm font-medium">Code Editor</h2>
        <div class="flex items-center space-x-2">
          <button
            (click)="resetCode()"
            class="text-xs text-gray-600 hover:text-gray-900"
          >
            Clear
          </button>
        </div>
      </div>
      <app-ace-editor
        #aceEditor
        [code]="code"
        [language]="language"
        (codeChange)="onCodeChange($event)"
      >
      </app-ace-editor>
    </div>
  `,
  styles: [],
})
export class CodeEditorComponent implements OnInit, OnChanges {
  @Input() language: string = 'python';
  @Output() codeChange = new EventEmitter<string>();
  @ViewChild('aceEditor') aceEditor!: AceEditorComponent;

  code: string = '';

  constructor(private storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadCode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language'] && !changes['language'].isFirstChange()) {
      this.loadCode();
      if (this.aceEditor) {
        this.aceEditor.updateLanguage(this.language);
        this.aceEditor.updateCode(this.code);
      }
    }
  }

  onCodeChange(code: string): void {
    this.code = code;
    this.storageService.saveCode(this.language, code);
    this.codeChange.emit(code);
  }

  resetCode(): void {
    this.code = '';
    if (this.aceEditor) {
      this.aceEditor.updateCode(this.code);
    }
    this.codeChange.emit(this.code);
  }

  private loadCode(): void {
    this.code = this.storageService.getCode(this.language);
  }
}
