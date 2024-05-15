import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KendoGridComponent } from '@my-mfe/shared-ui';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  /// This module is entrypoint for remote application - we need to include there everything
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    KendoGridComponent,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class RemoteMainModule {}
