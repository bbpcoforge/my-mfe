import { Component, OnInit } from '@angular/core';
import { Routes, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { AppconfigService } from '@shell/shared-ui';

@Component({
  selector: 'app-dynamic-routes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './dynamic-routes.component.html',
  styleUrl: './dynamic-routes.component.css',
})
export class DynamicRoutesComponent implements OnInit {
  routes: Routes = [];

  constructor(
    private appconfigService: AppconfigService,
    private router: Router
  ) {}

  ngOnInit() {
    this.appconfigService.loadData().subscribe((data) => {
      console.log(data);
      this.routes = this.buildRoutes(data);
      this.registerRoutes(this.routes); // Update router configuration
    });
  }
  buildRoutes(data: any[]): Routes {
    return data.map((route) => {
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
      else
        return {
          path: route.path,
          loadComponent: () =>
            import('@shell/shared-ui').then((m: any) => m[route.layout]), // Dynamic import based on layout
          loadChildren: () =>
            import(`${route.featureModule}`).then((m) => m[route.component]), // Dynamic import based on feature module
          //component: () => import(`./${route.featureModule}`).then((m) => m[route.component]), // Dynamic import based on component path
        };
    });
  }
  registerRoutes(routes: Routes) {
    this.router.config = routes;
  }
}
