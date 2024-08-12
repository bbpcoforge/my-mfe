import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { ExtangularappComponent } from './extangularapp.component';

const routes: Routes = [
  { path: '', component: ExtangularappComponent },
  {
    path: '1',
    loadComponent: () =>
      loadRemoteModule('angular-mfe', './Component').then(
        (m) => m.AppComponent
      ),
  },
];

@NgModule({
  imports: [ExtangularappComponent, RouterModule.forChild(routes)], // Feature-specific routing
  exports: [RouterModule], // Expose routing for parent module
})
export default class ExtangularappModule {}
