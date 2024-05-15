import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { KendoGridComponent } from '@my-mfe/shared-ui';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, KendoGridComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'remote1';
}
