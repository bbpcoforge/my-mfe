import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-15264378.okta.com/oauth2/default',
  clientId: '0oahegnaf01MuIe9Q5d7',
  redirectUri: window.location.origin + '/login/callback',
});

@NgModule({
  declarations: [],
  imports: [CommonModule, OktaAuthModule.forRoot({ oktaAuth })],
})
export class HomeShellModule {}
