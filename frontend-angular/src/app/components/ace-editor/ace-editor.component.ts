// components/ace-editor.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-r';
import 'ace-builds/src-noconflict/theme-github';

@Component({
  selector: 'app-ace-editor',
  template: `<div
    #editorContainer
    class="editor-container"
    style="height: 400px;"
  ></div>`,
  styles: [
    `
      .editor-container {
        border: 1px solid #ccc;
      }
    `,
  ],
})
export class AceEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() code: string = '';
  @Input() language: string = 'python';
  @Output() codeChange = new EventEmitter<string>();

  private editor: ace.Ace.Editor | null = null;

  ngAfterViewInit(): void {
    this.initAce();
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  private initAce(): void {
    const container = this.editorContainer.nativeElement;

    this.editor = ace.edit(container);
    this.editor.setTheme('ace/theme/github');
    this.setMode(this.language);
    this.editor.setValue(this.code, -1);
    this.editor.setOptions({
      fontSize: '14px',
      showPrintMargin: false,
    });

    this.editor.on('change', () => {
      if (this.editor) {
        const value = this.editor.getValue();
        this.codeChange.emit(value);
      }
    });
  }

  private setMode(language: string): void {
    if (this.editor) {
      if (language === 'python') {
        this.editor.session.setMode('ace/mode/python');
      } else if (language === 'r') {
        this.editor.session.setMode('ace/mode/r');
      }
    }
  }

  public updateLanguage(language: string): void {
    this.language = language;
    this.setMode(language);
  }

  public updateCode(code: string): void {
    if (this.editor) {
      this.editor.setValue(code, -1);
    }
  }
}
