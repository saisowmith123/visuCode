import { Injectable } from '@angular/core';

const LOCAL_STORAGE_KEY = 'visucode_user_code';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveCode(language: string, code: string): void {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
    saved[language] = code;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved));
  }

  getCode(language: string): string {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
    return saved[language] || this.getPlaceholderCode(language);
  }

  // saveLanguage(language: string): void {
  //   localStorage.setItem('visucode-language', language);
  // }

  // getLanguage(): string {
  //   return localStorage.getItem('visucode-language') || 'python';
  // }

  private getPlaceholderCode(language: string): string {
    if (language === 'python') {
      return `# Python visualization code example
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)')
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()`;
    } else {
      return `# R visualization code example
library(plotly)
p <- plot_ly(x = ~c(1, 2, 3), y = ~c(4, 5, 6), type = 'scatter', mode = 'lines')`;
    }
  }
}
