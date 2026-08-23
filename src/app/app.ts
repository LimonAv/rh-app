import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class App {
  protected readonly title = signal('rh-app');
}
