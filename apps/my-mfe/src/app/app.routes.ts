import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
//import { NxWelcomeComponent } from './nx-welcome.component';
import { HomeComponent } from './home/home.component';

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
      import('@my-mfe/shared-ui').then((m) => m.KendoGridComponent),
  },
];
