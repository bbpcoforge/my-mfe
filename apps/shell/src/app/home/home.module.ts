import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import HomeComponent from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [HomeComponent, RouterModule.forChild(routes)], // Feature-specific routing
  exports: [RouterModule], // Expose routing for parent module
})
export default class HomeModule {}
