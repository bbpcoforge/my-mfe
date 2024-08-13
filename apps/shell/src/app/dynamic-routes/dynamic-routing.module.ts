import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicRoutesComponent } from './dynamic-routes.component';

const routes: Routes = [];

@NgModule({
  imports: [DynamicRoutesComponent, RouterModule.forChild(routes)], // Feature-specific routing
  exports: [RouterModule], // Expose routing for parent module
})
export class DynamicRoutingModule {}
