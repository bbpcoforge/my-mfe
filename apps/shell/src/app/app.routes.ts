import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m['KendoAppbarComponent']),
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'remote',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m['KendoDrawerComponent']),
    loadChildren: () =>
      loadRemoteModule('remote1', './remote1Module').then(
        (m) => m.RemoteMainModule
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m['KendoAppbarComponent']),
    children: [{ path: '', component: ProfileComponent }],
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'protected',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m['KendoAppbarComponent']),
    loadChildren: () =>
      import('./protected/routes').then((m) => m.PROTECTED_FEATURE_ROUTES),
    canActivate: [OktaAuthGuard],
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  /*{
    path: 'products',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m.KendoGridComponent),
  },
  {
    path: 'drawer',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m.KendoDrawerComponent),
  },
  {
    path: 'appbar',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m.KendoAppbarComponent),
  },*/
];
