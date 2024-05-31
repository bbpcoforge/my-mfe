import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public name$!: Observable<string>;
  private oktaAuthStateService = inject(OktaAuthStateService);

  public ngOnInit(): void {
    this.name$ = this.oktaAuthStateService.authState$.pipe(
      filter(
        (authState: AuthState) => !!authState && !!authState.isAuthenticated
      ),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }
}
