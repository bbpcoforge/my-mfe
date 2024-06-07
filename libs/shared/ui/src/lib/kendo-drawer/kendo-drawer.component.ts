import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { SVGIcon, menuIcon, userIcon } from '@progress/kendo-svg-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map } from 'rxjs';

import { AppconfigService } from '../appconfig.service';

@Component({
  selector: 'lib-kendo-drawer',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    LayoutModule,
    ButtonsModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './kendo-drawer.component.html',
  styleUrl: './kendo-drawer.component.css',
})
export class KendoDrawerComponent implements OnInit {
  public expanded = false;
  public menuSvg: SVGIcon = menuIcon;
  public userIcon: SVGIcon = userIcon;

  public isAuthenticated$!: Observable<boolean>;
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  public selected: { [Key: string]: unknown } = {
    path: '/remote',
    title: 'Remote application',
    description: 'Remote app with native fedration',
    iconFlag: 'k-i-inherited',
    selected: true,
  };
  public pretectedRoutes: { [Key: string]: unknown }[] = [];
  public items = [];
  /*public items = [
    {
      path: '/',
      title: 'Home',
      description: 'This is shell app',
      iconFlag: 'k-i-home',
    },
    { separator: true },
    {
      path: '/remote',
      title: 'Remote application',
      description: 'Remote app with native fedration',
      iconFlag: 'k-i-inherited', //k-i-aggregate-fields
      selected: true,
    },
  ];*/

  constructor(
    private route: ActivatedRoute,
    private appconfigService: AppconfigService
  ) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.appconfigService.loadData().subscribe((data) => {
      const publicRoutes = data.filter(
        (item: { [Key: string]: unknown }) => !item['protected']
      );
      this.items = publicRoutes.filter((item: { [Key: string]: unknown }) => {
        if (item['path'] === this.route.snapshot.url[0].path)
          item['selected'] = true;
        return item;
      });
      this.pretectedRoutes = data.filter(
        (item: { [Key: string]: unknown }) => item['protected']
      );
      this.selected =
        data.filter(
          (item: { [Key: string]: unknown }) =>
            item['path'] === this.route.snapshot.url[0].path
        )[0] || data[0];
    });
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item;
  }
}
