import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('rh-app');
}
