import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./remote-main/remote-main.module').then(
        (m) => m.RemoteMainModule
      ),
  },
];
