import {
  Component,
  ViewEncapsulation,
  ViewChild,
  NgZone,
  AfterViewInit,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map } from 'rxjs';
import {
  bellIcon,
  menuIcon,
  searchIcon,
  SVGIcon,
  userIcon,
} from '@progress/kendo-svg-icons';
import { AppconfigService } from '../appconfig.service';

@Component({
  selector: 'lib-kendo-appbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    LayoutModule,
    PopupModule,
    InputsModule,
    IconsModule,
    NavigationModule,
    ButtonsModule,
    FormsModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './kendo-appbar.component.html',
  styleUrl: './kendo-appbar.component.css',
})
export class KendoAppbarComponent implements AfterViewInit, OnInit {
  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
  public searchIcon: SVGIcon = searchIcon;
  public userIcon: SVGIcon = userIcon;

  public isAuthenticated$!: Observable<boolean>;
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  @ViewChild('anchor', { static: false })
  //public anchor: ElementRef<HTMLElement>;
  public margin = { horizontal: -46, vertical: 7 };
  public show = false;
  public publicRoutes: { [Key: string]: unknown }[] = [];
  public pretectedRoutes: { [Key: string]: unknown }[] = [];

  public onToggle(): void {
    this.show = !this.show;
  }

  constructor(
    private zone: NgZone,
    private anchor: ElementRef<HTMLElement>,
    private appconfigService: AppconfigService
  ) {}

  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', () => {
        if (this.show) {
          this.zone.run(() => this.onToggle());
        }
      });
    });
  }
  public ngOnInit(): void {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.appconfigService.loadData().subscribe((data) => {
      this.publicRoutes = data.filter(
        (item: { [Key: string]: unknown }) => !item['protected']
      );
      this.pretectedRoutes = data.filter(
        (item: { [Key: string]: unknown }) => item['protected']
      );
    });
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
}
