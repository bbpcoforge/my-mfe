import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactAppWrapperComponent } from './react-app-wrapper.component';

const routes: Routes = [{ path: '', component: ReactAppWrapperComponent }];

@NgModule({
  imports: [ReactAppWrapperComponent, RouterModule.forChild(routes)], // Feature-specific routing
  exports: [RouterModule], // Expose routing for parent module
})
export default class ReactAppWrapperModule {}
