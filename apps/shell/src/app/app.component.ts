import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DynamicRoutingModule } from './dynamic-routes/dynamic-routing.module';
//import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
//import { AuthState } from '@okta/okta-auth-js';
//import { Observable, filter, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, DynamicRoutingModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shell';
}
/*export class AppComponent implements OnInit {
  title = 'shell';
  
  public isAuthenticated$!: Observable<boolean>;
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  public ngOnInit(): void {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
  
}*/
