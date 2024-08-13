import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './protected.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  { path: '', component: ProtectedComponent },
  { path: 'profile', component: ProfileComponent },
];
@NgModule({
  imports: [ProfileComponent, RouterModule.forChild(routes)], // Feature-specific routing
  exports: [RouterModule], // Expose routing for parent module
})
export default class ProtectedModule {}
