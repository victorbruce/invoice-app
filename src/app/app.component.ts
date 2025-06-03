import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDark = false;

  constructor(private renderer: Renderer2) {}

  toggleTheme() {
    this.isDark = !this.isDark;

    const themeClass = 'dark-theme';

    if (this.isDark) {
      this.renderer.addClass(document.documentElement, themeClass);
    } else {
      this.renderer.removeClass(document.documentElement, themeClass);
    }
  }
}
