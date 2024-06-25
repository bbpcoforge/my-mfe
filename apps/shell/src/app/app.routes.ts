import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

//import { HomeComponent } from './home/home.component';
//import { ProfileComponent } from './profile/profile.component';

export async function getAppRoutes(): Promise<Route[]> {
  const res = await fetch('assets/appSetting.json');
  const data = await res.json();
  const route = data.map((route: any) => {
    if (route.remoteModule)
      return {
        path: route.path,
        loadComponent: () =>
          import('@shell/shared-ui').then((m: any) => m[route.layout]), // Dynamic import based on layout
        loadChildren: () =>
          loadRemoteModule(
            route.remoteModule.name,
            `${route.remoteModule.exposes}`
          ).then((m) => m[route.remoteModule.module]), // Dynamic import based on remote module
      };
    else {
      return {
        path: route.path,
        pathMatch: route.path ? '' : 'full',
        loadComponent: () =>
          import('@shell/shared-ui').then((m: any) => m[route.layout]),
        loadChildren: async () => {
          return import(`./${route.featureModule}.module.ts`).then((m) => {
            return m.default;
          });
        },
      };
    }
    // {
    //   const dynamicRoute= {
    //     path: route.path,
    //     loadComponent: () =>
    //       import('@shell/shared-ui').then((m: any) => m[route.layout]), // Dynamic import based on layout
    //     loadChildren: () =>
    //       import(route.featureModule)
    //         .then((m) => {
    //           console.log('@#@#', m);
    //           return m[route.module];
    //         })
    //         .catch((err) => console.error(err)), // Dynamic import based on feature module
    //     //component: () => import(`./${route.featureModule}`).then((m) => m[route.component]), // Dynamic import based on component path

    //   };
    //   console.log(" return dynamicRoute;", dynamicRoute);
    //   return dynamicRoute;
    // }
  });
  route.push({ path: 'login/callback', component: OktaCallbackComponent });
  return route;
}

//getAppRoutes().then((rs)=> console.log('getAppRoutes', rs));
/*
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
      import('@shell/shared-ui').then((m) => m['KendoDrawerComponent']),
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
  },
];
*/
