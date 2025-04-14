import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AceEditorComponent } from './components/ace-editor/ace-editor.component';

import { AppComponent } from './app.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { CardComponent } from './components/ui/card/card.component';
import { SelectComponent } from './components/ui/select/select.component';

import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AceEditorComponent,
    CodeEditorComponent,
    LanguageSelectorComponent,
    VisualizationComponent,
    ButtonComponent,
    CardComponent,
    SelectComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [ApiService, LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
