import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { VisualizationResult } from '../../models/visualization.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visualization',
  template: `
    <div class="border rounded-md mt-6">
      <div class="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <h2 class="text-sm font-medium">Visualization Result</h2>
        <app-button (click)="generateVisualization()">
          Generate Visualization
        </app-button>
      </div>
      <div
        class="p-4 flex items-center justify-center"
        [style.minHeight.px]="400"
      >
        <div *ngIf="loading" class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
          ></div>
          <p class="mt-2 text-gray-600">Generating visualization...</p>
        </div>

        <div *ngIf="!loading && result?.error" class="text-red-500 p-4">
          {{ result!.error }}
        </div>

        <div
          *ngIf="!loading && result?.url"
          class="w-full flex flex-col items-center justify-center"
          style="height: 400px;"
        >
          <div class="w-full flex justify-end mb-2">
            <a
              [href]="result!.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <span>Open in New Tab</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <ng-container *ngIf="isImage(result!.url); else htmlFrame">
            <div class="max-w-full h-full flex items-center justify-center">
              <img
                [src]="result!.url"
                alt="Visualization"
                class="max-h-full max-w-full object-contain"
              />
            </div>
          </ng-container>
          <ng-template #htmlFrame>
            <iframe
              [src]="safeUrl"
              title="Visualization"
              class="w-full h-full border-none"
              sandbox="allow-scripts"
            ></iframe>
          </ng-template>
        </div>

        <div *ngIf="!loading && !result" class="text-gray-400 text-center">
          Click "Generate Visualization" to render your code
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class VisualizationComponent implements OnChanges {
  @Input() code: string = '';
  @Input() language: string = 'python';

  safeUrl?: SafeResourceUrl;

  result: VisualizationResult | null = null;
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnChanges(): void {
    this.updateSafeUrl();
  }

  private updateSafeUrl(): void {
    if (this.result?.url && !this.isImage(this.result.url)) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.result.url
      );
    }
  }

  generateVisualization(): void {
    if (!this.code.trim()) {
      return;
    }

    this.loading = true;
    this.apiService.generateVisualization(this.code, this.language).subscribe({
      next: (result) => {
        console.log('Visualization result:', result);
        this.result = result;
        this.updateSafeUrl();
        this.loading = false;
      },
      error: (error) => {
        console.error('Visualization error:', error);
        this.result = {
          error: 'Failed to generate visualization: ' + error.message,
        };
        this.loading = false;
      },
    });
  }

  isImage(url: string | undefined): boolean {
    if (!url) return true;
    return /\.(png|jpe?g|gif|webp|svg)$/i.test(url);
  }
}
