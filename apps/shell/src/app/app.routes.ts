import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'remote',
    loadChildren: () =>
      loadRemoteModule('remote1', './remote1Module').then(
        (m) => m.RemoteMainModule
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('@shell/shared-ui').then((m) => m.KendoGridComponent),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'protected',
    loadChildren: () =>
      import('./protected/routes').then((m) => m.PROTECTED_FEATURE_ROUTES),
    canActivate: [OktaAuthGuard],
  },
  { path: 'login/callback', component: OktaCallbackComponent },
];
